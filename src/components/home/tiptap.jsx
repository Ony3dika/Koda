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
import { HeadingButton, toggleHeading } from "../tiptap-ui/heading-button";

// --- UI Primitives ---
import { Button } from "@/components/tiptap-ui-primitive/button";
import { Spacer } from "@/components/tiptap-ui-primitive/spacer";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/tiptap-ui-primitive/toolbar";

// --- Tiptap Node ---
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension";
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
import {
  ColorHighlightPopover,
  ColorHighlightPopoverContent,
  ColorHighlightPopoverButton,
} from "@/components/tiptap-ui/color-highlight-popover";
import {
  LinkPopover,
  LinkContent,
  LinkButton,
} from "@/components/tiptap-ui/link-popover";
import { MarkButton } from "@/components/tiptap-ui/mark-button";
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button";
import { UndoRedoButton } from "@/components/tiptap-ui/undo-redo-button";

// --- Icons ---
import { ArrowLeftIcon } from "@/components/tiptap-icons/arrow-left-icon";
import { HighlighterIcon } from "@/components/tiptap-icons/highlighter-icon";
import { LinkIcon } from "@/components/tiptap-icons/link-icon";

// --- Hooks ---
import { useIsMobile } from "@/hooks/use-mobile";
import { useWindowSize } from "@/hooks/use-window-size";
import { useCursorVisibility } from "@/hooks/use-cursor-visibility";

// --- Components ---

// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils";

// --- Styles ---
// import "@/components/tiptap-templates/simple/simple-editor.scss";
import content from "@/components/tiptap-templates/simple/data/content.json";
import { Separator } from "../ui/separator";

const Tiptap = ({content}) => {
  const editor = useEditor({
    extensions: [StarterKit, CharacterCount],
    immediatelyRender: false,
    content: content,
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
    ],
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm lg:prose-lg xl:prose-xl rounded-lg outline-none h-[75vh] min-w-full",
      },
    },
  });

  return (
    <EditorContext.Provider value={{ editor }}>
      <section className='w-full h-full p-3'>
        <div className='flex items-center justify-center '>
          <ToolbarGroup>
            <UndoRedoButton action='undo' />
            <UndoRedoButton action='redo' />
          </ToolbarGroup>
          <ToolbarSeparator />
          <ToolbarGroup>
            <HeadingDropdownMenu portal={false} levels={[1, 2, 3, 4]} />
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
        </div>
        <Separator/>
        <div className='w-full overflow-y-scroll mt-5 h-[82vh] [scrollbar-color:--alpha(var(--primary)/0%)_transparent] [scrollbar-width:thin]'>
          {" "}
          <EditorContent editor={editor} />
        </div>
      </section>
    </EditorContext.Provider>
  );
};

export default Tiptap;
