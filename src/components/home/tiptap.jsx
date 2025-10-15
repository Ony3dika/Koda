"use client";

import { useEditor, EditorContent, EditorContext } from "@tiptap/react";
import CharacterCount from "@tiptap/extension-character-count";
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Selection } from "@tiptap/extensions";

// --- UI Primitives ---
import { Button } from "@/components/tiptap-ui-primitive/button";
import {
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/tiptap-ui-primitive/toolbar";

// --- Tiptap Node ---
import { HorizontalRule } from "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension";
import "@/components/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/heading-node/heading-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";
// --- Tiptap UI ---
import { HeadingDropdownMenu } from "@/components/tiptap-ui/heading-dropdown-menu";
import { ImageUploadButton } from "@/components/tiptap-ui/image-upload-button";
import { ListDropdownMenu } from "@/components/tiptap-ui/list-dropdown-menu";
import { BlockquoteButton } from "@/components/tiptap-ui/blockquote-button";
import { CodeBlockButton } from "@/components/tiptap-ui/code-block-button";
import { ColorHighlightPopover } from "@/components/tiptap-ui/color-highlight-popover";
import { LinkPopover } from "@/components/tiptap-ui/link-popover";
import { MarkButton } from "@/components/tiptap-ui/mark-button";
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button";
import { UndoRedoButton } from "@/components/tiptap-ui/undo-redo-button";

// --- Styles ---
import styles from "@/styles/tiptap.css";

import { useCursorVisibility } from "@/hooks/use-cursor-visibility";

// --- Styles ---
import "@/components/tiptap-templates/simple/simple-editor.scss";

import { Separator } from "../ui/separator";
import { LoaderCircle, Save } from "lucide-react";
import { useEditDocument } from "@/lib/documet-actions";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { supabase } from "@/utils/supabase";
import { RealtimeChannel } from "@supabase/supabase-js";
import { useStore } from "@/app/store";
import { useEffect, useRef, useState } from "react";
import Notification from "@/components/notification"
const debounce = (func, wait) => {
  let timeout;
  return (content) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(content), wait);
  };
};
const Tiptap = ({ content, id }) => {
  const { userID, updateUserID } = useStore();

  // Generate a test user ID if none exists
  useEffect(() => {
    if (!userID) {
      const testUserId = `user_${Math.random().toString(36).substr(2, 9)}`;
      updateUserID(testUserId);
    }
  }, [userID, updateUserID]);

  const [presence, setPresence] = useState({});
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const presenceChannel = useRef(null);
  const isLocalChange = useRef(false);
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        link: {
          openOnClick: false,
          enableClickSelection: true,
        },
      }),
      HorizontalRule,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,
      Selection,
      CharacterCount,
    ],
    immediatelyRender: false,
    content: content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      // Send back to parent or update your state
      broadcastContentChange(html);
    },
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm lg:prose-lg xl:prose-xl rounded-lg outline-none h-[75vh] min-w-full",
      },
    },
  });
  const { mutate: saveContent, isPending: isSavingContent } = useEditDocument();

  // Save Document
  const handlesaveContent = async () => {
    const content = { content: editor.getHTML(), id: id };

    saveContent(content, {
      onSuccess: () => {
        toast.success("Document Saved");
      },
      onError: (err) => {
        console.error(err?.message);
      },
    });
  };

  useEffect(() => {
    const setupPresence = async () => {
      if (!userID || !id || !editor) return;

      const channel = supabase.channel(`document:${id}`, {
        config: {
          presence: {
            key: userID,
          },
        },
      });

      // Set up presence tracking
      channel.on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        const presenceData = {};
        Object.entries(state).forEach(([key, value]) => {
          if (Array.isArray(value) && value.length > 0) {
            const presence = value[0];
            presenceData[key] = presence;
          }
        });
        setPresence(presenceData);
      });

      channel.on("presence", { event: "join" }, ({ key, newPresences }) => {
        if (newPresences && newPresences.length > 0) {
          setPresence((prev) => ({ ...prev, [key]: newPresences[0] }));
        }
      });

      channel.on("presence", { event: "leave" }, ({ key, leftPresences }) => {
        setPresence((prev) => {
          const newPresence = { ...prev };
          delete newPresence[key];
          return newPresence;
        });
      });

      // Listen for content changes from other users
      channel.on("broadcast", { event: "content_change" }, ({ payload }) => {
        console.log(
          "Received content change from:",
          payload.userId,
          "Current user:",
          userID
        );
        if (payload.userId !== userID && editor) {
          isLocalChange.current = true;
          editor.commands.setContent(payload.content);
          isLocalChange.current = false;
        }
      });

      // Subscribe to the channel and track presence
      const subscribePromise = channel.subscribe(async (status) => {
        setConnectionStatus(status);
        if (status === "SUBSCRIBED") {
          await channel.track({
            user: userID,
            cursor: null,
            online_at: new Date().toISOString(),
          });
        }
      });

      presenceChannel.current = channel;

      return subscribePromise;
    };

    setupPresence();

    return () => {
      if (presenceChannel.current) {
        presenceChannel.current.unsubscribe();
      }
    };
  }, [userID, id, editor]);

  const broadcastContentChange = debounce(async (newContent) => {
    if (!presenceChannel.current || !userID || isLocalChange.current) {
      return;
    }

    try {
      console.log("Broadcasting content change from user:", userID);
      await presenceChannel.current.send({
        type: "broadcast",
        event: "content_change",
        payload: {
          userId: userID,
          content: newContent,
        },
      });
    } catch (error) {
      console.error("Failed to broadcast content change:", error);
    }
  }, 300);

  return (
    <EditorContext.Provider value={{ editor }}>
      <section className='w-full h-full relative p-3'>
        <Notification/>
        <div className='sticky top-0 bg-background/90 backdrop-blur-xl z-10'>
          {" "}
          <div className='flex items-center justify-center w-full md:w-auto md:overflow-auto  overflow-x-scroll mb-2'>
            <ToolbarGroup>
              <UndoRedoButton action='undo' />
              <UndoRedoButton action='redo' />
            </ToolbarGroup>
            <ToolbarSeparator />
            <ToolbarGroup>
              <HeadingDropdownMenu levels={[1, 2, 3, 4]} />
              <ListDropdownMenu
                types={["bulletList", "orderedList", "taskList"]}
              />
              <BlockquoteButton />
              <CodeBlockButton />
            </ToolbarGroup>
            <ToolbarSeparator />
            <ToolbarGroup>
              <MarkButton type='bold' />
              <MarkButton type='italic' />
              <MarkButton type='strike' />
              <MarkButton type='code' />
              <MarkButton type='underline' />
              <ColorHighlightPopover />
              <LinkPopover />
            </ToolbarGroup>
            <ToolbarSeparator />
            <ToolbarGroup>
              <TextAlignButton align='left' />
              <TextAlignButton align='center' />
              <TextAlignButton align='right' />
              <TextAlignButton align='justify' />
            </ToolbarGroup>
            <ToolbarSeparator />
            <ToolbarGroup>
              {isSavingContent ? (
                <Button disabled variant='outline' className='animate-pulse'>
                  <LoaderCircle size={20} className='animate-spin' />
                </Button>
              ) : (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={handlesaveContent}
                      className='cursor-pointer ml-1'
                    >
                      <Save size={20} strokeWidth={"1.5"} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Save changes to document</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </ToolbarGroup>
          </div>
          <Separator />
        </div>

        {/* Connection Status and Online Users Indicator */}
        <div className='md:flex hidden items-center justify-between mt-2 mb-2 top-5 sticky z-10'>
          <div className='flex items-center gap-2'>
            <div
              className={`w-2 h-2 rounded-full ${
                connectionStatus === "SUBSCRIBED"
                  ? "bg-green-500"
                  : connectionStatus === "CHANNEL_ERROR"
                  ? "bg-red-500"
                  : "bg-yellow-500"
              }`}
            />
            <span className='text-xs text-muted-foreground'>
              {connectionStatus === "SUBSCRIBED"
                ? "Connected"
                : connectionStatus === "CHANNEL_ERROR"
                ? "Connection Error"
                : "Connecting..."}
            </span>
          </div>

          {Object.keys(presence).length > 0 && (
            <div className='flex items-center gap-2'>
              <span className='text-xs text-muted-foreground'>
                {Object.keys(presence).length} user
                {Object.keys(presence).length !== 1 ? "s" : ""} online
              </span>
              <div className='flex gap-1'>
                {Object.keys(presence).map((userId) => (
                  <div
                    key={userId}
                    className='w-2 h-2 bg-blue-500 rounded-full'
                    title={`User ${userId}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className='w-full mt-5 h-[82vh] tiptap-wrapper'>
          <EditorContent editor={editor} />
        </div>
      </section>
    </EditorContext.Provider>
  );
};

export default Tiptap;
