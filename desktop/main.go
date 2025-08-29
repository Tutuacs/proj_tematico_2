package main

import (
	webview "github.com/webview/webview_go"
)

func main() {
	w := webview.New(true)
	defer w.Destroy()
	w.SetTitle("Google - Go Web Viewer")
	w.SetSize(1024, 768, 0)
	w.Navigate("https://www.google.com")
	w.Run()
}
