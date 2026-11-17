"""Where ffmpeg is: $FFMPEG, else ffmpeg on PATH, else Peter's winget install."""
import os, shutil
FF = os.environ.get("FFMPEG") or shutil.which("ffmpeg") or r"C:\Users\Peter\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0.2-full_build\bin\ffmpeg.exe"
