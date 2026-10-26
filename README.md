# Alex Portfolio — Portfólio pessoal

[DEMO](https://www.ruhhbs.club/Alexportfoliov1/)

<img width="1883" height="1249" alt="image" src="https://github.com/user-attachments/assets/9a32ce45-e093-470f-9249-147818a4d71c" />




Portfólio pessoal em uma única página, no formato link-in-bio. Feito com HTML, CSS e JavaScript puros, sem frameworks, backend, processo de build, analytics ou dependências remotas em tempo de execução.

## Recursos

- Perfil com avatar, apresentação e frase com efeito de digitação.
- Borda animada no avatar e tema escuro com iluminação e sombras.
- Cartões para X/Twitter, YouTube, Steam e Discord.
- Botão para copiar o usuário do Discord e botão de contato por e-mail.
- Galeria ultrawide com navegação horizontal e visualização ampliada.
- Prévia personalizada ao compartilhar o endereço no Discord.
- Layout responsivo, foco visível, navegação por teclado e suporte à preferência por movimento reduzido.
- Font Awesome Free incluído localmente.

## Estrutura

```text
.
├── index.html
├── README.md
└── assets/
    ├── css/
    │   └── styles.css
    ├── js/
    │   └── main.js
    ├── img/
    │   ├── avatar-placeholder.png
    │   │   ├── favicon.png
    │   └── gallery/
    │       ├── bruxo_00001.jpg
    │       ├── Grounded2_gameplayoflove.jpg
    │       ├── MyTimeatSandrocksolo.jpg
    │       ├── oldbloodface.jpg
    │       └── palbad.jpg
    └── vendor/
        └── fontawesome/
            ├── css/
            │   └── all.min.css
            └── webfonts/
```

## Executar localmente

Não é necessário instalar dependências. Abra `index.html` diretamente no navegador ou inicie um servidor local na pasta do projeto:

```sh
python -m http.server 8000
```

Acesse <http://localhost:8000>.

## Personalizar o perfil

No `index.html`, localize o bloco `profile-config` logo no início do `<body>`. Altere os valores:

| Atributo | Uso |
| --- | --- |
| `data-name` | Nome ou apelido mostrado no perfil. |
| `data-bio` | Apresentação curta. |
| `data-text` | Frase com efeito de digitação. |
| `data-avatar` | Caminho relativo do avatar, por exemplo `assets/img/avatar.gif`. |
| `data-x` | Endereço do perfil no X/Twitter. |
| `data-youtube` | Endereço do canal no YouTube. |
| `data-steam` | Endereço do perfil na Steam. |
| `data-discord` | Usuário mostrado e copiado pelo cartão Discord. |
| `data-email` | Endereço aberto pelo botão de e-mail. |

Para ocultar um cartão social ou o botão de e-mail, deixe o atributo correspondente vazio. Os links sociais devem usar endereços completos com `https://`.

### Avatar e favicon

Coloque a imagem do avatar em `assets/img/` e atualize `data-avatar`. JPEG, PNG, GIF, WebP, SVG e AVIF são suportados pelo navegador. Se o arquivo do avatar não carregar, o site exibe `avatar-placeholder.png`. Para trocar o favicon, substitua `assets/img/favicon.png`.

### Cartões sociais

Os textos dos cartões — título, descrição e ação — ficam diretamente no `index.html`. Para mudar as descrições ou cores, edite o cartão correspondente e as regras `.social-card-*` em `assets/css/styles.css`. O cartão Discord copia o texto definido em `data-discord`; não abre um link externo.

### Galeria ultrawide

As imagens estão em `assets/img/gallery/`. A galeria exibe até quatro imagens por vez em telas grandes, duas em telas médias e uma em celulares; as setas ou o gesto horizontal permitem percorrer as demais. Selecione uma imagem para ampliá-la e navegue pelo diálogo usando as setas ou o teclado.

Para adicionar ou substituir uma imagem:

1. Coloque o arquivo em `assets/img/gallery/`.
2. Edite ou copie um `<figure class="gallery-item">` no `index.html`.
3. Atualize `src`, `alt`, `figcaption`, `aria-label` e `data-gallery-index` para corresponder à imagem.

### Aparência

As principais cores e sombras estão definidas como variáveis no início de `assets/css/styles.css`. Ajuste `--accent` para mudar o destaque geral e as variáveis `--page-bg`, `--card-bg`, `--surface-bg`, `--text` e `--muted` para personalizar o tema.

## Prévia de compartilhamento no Discord

O `<head>` de `index.html` inclui tags Open Graph e Twitter Cards, além do payload `discord:component-embed`. Na prévia do Discord, ele apresenta o avatar, uma breve descrição, o nome do Discord e botões para X/Twitter, YouTube e Steam. Os cartões visíveis na página são independentes e permanecem no perfil.

Ao alterar nome, descrição, avatar, domínio ou links, revise **as duas partes** do `<head>`: as tags Open Graph/Twitter e o JSON dentro de `<script id="discord:component-embed">`. Esse JSON é estático e não é atualizado automaticamente a partir de `profile-config`.

Para que o Discord consiga gerar a prévia:

- Publique a página em HTTP/HTTPS e confirme que ela responde com sucesso.
- Mantenha as tags e o JSON diretamente no HTML enviado pelo servidor; o crawler não executa o JavaScript do site.
- Use uma URL HTTPS absoluta e publicamente acessível para a imagem.
- Mantenha o payload do component embed abaixo de 3.000 bytes.

O component embed é um recurso do Discord e pode estar sujeito a mudanças. Se o Discord não renderizar a versão personalizada, as tags Open Graph fornecem uma prévia padrão. O Discord também pode reutilizar uma prévia em cache após a publicação.

Referências oficiais:

- [Discord — Link Previews](https://docs.discord.com/developers/link-previews/overview)
- [Discord — Component Embeds](https://docs.discord.com/developers/link-previews/component-embeds)

## Publicar

O projeto não requer compilação. Envie o conteúdo do projeto para um provedor de hospedagem estática, como GitHub Pages, Netlify ou Vercel. Preserve a estrutura da pasta `assets/` e publique o `index.html` na raiz do site para que os caminhos relativos continuem funcionando.

### GitHub Pages

1. Crie um repositório no GitHub e envie os arquivos do projeto.
2. Abra **Settings → Pages** nas configurações do repositório.
3. Em **Build and deployment**, escolha **Deploy from a branch**.
4. Selecione a branch desejada e a pasta `/ (root)` e salve.
5. Aguarde a publicação e acesse a URL informada pelo GitHub Pages.

Se configurar um domínio próprio, atualize `og:url`, `og:image`, `twitter:image` e as URLs das imagens do Discord para usar o domínio final.

## Privacidade e acessibilidade

O projeto não inclui rastreamento, analytics, login, painel de edição ou backend. Os links externos abrem com as proteções de nova aba apropriadas; o Discord copia o nome de usuário no próprio navegador. A página usa HTML semântico, texto alternativo para imagens, rótulos acessíveis, foco visível, alvos de toque de pelo menos 44 px e respeita `prefers-reduced-motion`.

## Créditos

Os ícones usam Font Awesome Free 6.7.2, distribuído localmente. Consulte as [licenças do Font Awesome](https://fontawesome.com/license/free): ícones sob CC BY 4.0, fontes sob SIL OFL 1.1 e código sob MIT.
