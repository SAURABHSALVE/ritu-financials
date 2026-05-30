# Review videos (production)

Place **optimized** files here (not the raw 100MB+ phone exports):

| File | Source |
|------|--------|
| `review-1.mp4` | `IMG_7355.MP4` (compress first — very large) |
| `review-2.mp4` | `IMG_4061.MP4` |
| `review-1-poster.webp` | First frame poster |
| `review-2-poster.webp` | First frame poster |

## One-time setup (requires [ffmpeg](https://ffmpeg.org/download.html))

From the **repo root**:

```powershell
.\scripts\optimize-review-videos.ps1
```

Target size: **under ~8 MB per clip** at 720p for web.

## CDN (optional, recommended for production)

Set in `frontend/.env.local`:

```
NEXT_PUBLIC_VIDEO_REVIEW_1=https://your-cdn/.../review-1.mp4
NEXT_PUBLIC_VIDEO_REVIEW_2=https://your-cdn/.../review-2.mp4
NEXT_PUBLIC_POSTER_REVIEW_1=https://your-cdn/.../review-1-poster.webp
NEXT_PUBLIC_POSTER_REVIEW_2=https://your-cdn/.../review-2-poster.webp
```

Use Mux, Cloudflare Stream, or Bunny Stream for adaptive HLS later.
