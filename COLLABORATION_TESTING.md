# Real-time Collaborative Editor Testing Guide

## Issues Fixed

1. **Duplicate extensions array** - Removed duplicate extensions configuration
2. **Missing channel subscription** - Added proper channel subscription and presence tracking
3. **Infinite content update loop** - Fixed the content change handling to prevent loops
4. **Missing user presence** - Added proper presence tracking with visual indicators
5. **TypeScript syntax errors** - Fixed ref declarations
6. **Error handling** - Added try-catch blocks and connection status indicators

## How to Test

### Prerequisites

1. Make sure you have Supabase environment variables set up in `.env.local`:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

2. Ensure your Supabase project has realtime enabled and the following tables:
   - `Documents` table with proper RLS policies

### Testing Steps

1. **Open the editor in one browser tab/window**

   - Navigate to a document (e.g., `/app/doc/[id]`)
   - You should see a connection status indicator at the top
   - Status should show "Connected" when ready

2. **Open the same document in another browser tab/window (or incognito mode)**

   - You should see both users appear in the "Online users" indicator
   - Each user will have a unique user ID (auto-generated if not set)

3. **Test real-time collaboration**

   - Type in one window
   - Changes should appear in the other window within ~100ms (debounced)
   - Check browser console for debug logs showing content broadcasts

4. **Test presence tracking**
   - Close one tab - the user should disappear from the online users list
   - Reopen - the user should reappear

### Debug Information

The editor now includes console logging for debugging:

- "Broadcasting content change from user: [userId]" - when sending changes
- "Received content change from: [userId]" - when receiving changes
- Connection status changes are logged

### Visual Indicators

- **Connection Status**: Green dot = Connected, Yellow = Connecting, Red = Error
- **Online Users**: Blue dots show active users
- **User Count**: Shows number of users currently online

### Troubleshooting

1. **No real-time updates**: Check Supabase environment variables
2. **Connection errors**: Verify Supabase project has realtime enabled
3. **Content not syncing**: Check browser console for error messages
4. **Users not appearing**: Ensure both tabs have the same document ID

### Performance Notes

- Content changes are debounced to 100ms to prevent excessive broadcasts
- Presence tracking is optimized to handle multiple users efficiently
- Local changes are properly isolated to prevent feedback loops
