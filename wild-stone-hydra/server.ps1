param([int]$Port = 8080)

$root = (Get-Item -Path ".").FullName
$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:" + $Port + "/"
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
    Write-Host "=========================================="
    Write-Host "🚀 SQUAD 9 LIVE SERVER ACTIVE"
    Write-Host "🌐 Link: http://localhost:$Port/"
    Write-Host "=========================================="
} catch {
    Write-Host "Failed to start listener: $_"
    exit 1
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = $request.Url.LocalPath
        if ($urlPath -eq "/" -or [string]::IsNullOrWhiteSpace($urlPath)) {
            $urlPath = "/index.html"
        }

        $cleanPath = $urlPath.TrimStart("/")
        $cleanPath = $cleanPath.Replace("/", [string][System.IO.Path]::DirectorySeparatorChar)
        $fullPath = [System.IO.Path]::Combine($root, $cleanPath)

        if ([System.IO.File]::Exists($fullPath)) {
            $bytes = [System.IO.File]::ReadAllBytes($fullPath)
            $response.StatusCode = 200
            if ($fullPath.EndsWith(".html")) { $response.ContentType = "text/html; charset=utf-8" }
            elseif ($fullPath.EndsWith(".jpg") -or $fullPath.EndsWith(".jpeg")) { $response.ContentType = "image/jpeg" }
            elseif ($fullPath.EndsWith(".png")) { $response.ContentType = "image/png" }
            elseif ($fullPath.EndsWith(".webp")) { $response.ContentType = "image/webp" }
            elseif ($fullPath.EndsWith(".svg")) { $response.ContentType = "image/svg+xml" }
            elseif ($fullPath.EndsWith(".css")) { $response.ContentType = "text/css" }
            elseif ($fullPath.EndsWith(".js")) { $response.ContentType = "application/javascript" }
            elseif ($fullPath.EndsWith(".json")) { $response.ContentType = "application/json" }
            else { $response.ContentType = "application/octet-stream" }
            
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes("File Not Found")
            $response.ContentLength64 = $errBytes.Length
            $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
        }
        $response.Close()
    } catch {
        # keep serving
    }
}
