# Application Rules & Business Logic

This document outlines the core business logic, use cases, and rules governing the PixelMeet application.

## Map Access & Permissions

- **Private Map Access:**
   - If a map is private (`isPublic: false`), the application must not attempt to fetch it directly from public storage.
   - **Resolution Flow:**
      1. Query the `/download-url` endpoint for the target map.
      2. **Success:** If the endpoint returns a valid response (containing a presigned URL), use that URL to fetch the map data.
      3. **Failure:** If the endpoint returns an error (e.g., 403 Forbidden) or no URL, the user lacks the necessary permissions. The UI must display an "Access Denied" error.

- **User Permissions:**
   - **Strict Ownership:** A user cannot view another user's private map without explicit view access.
   - Access is validated server-side via the `/download-url` generation process; the frontend must respect this by handling the failure case gracefully.
