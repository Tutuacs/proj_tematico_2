import webview

def main():
    # Título da janela, URL a abrir
    webview.create_window("Meu WebViewer", "https://www.google.com", width=800, height=600)
    webview.start()

if __name__ == "__main__":
    main()
