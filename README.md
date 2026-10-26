Alex — Portfólio pessoal

Modelo de portfólio pessoal em uma página, no formato link-in-bio. O projeto incluído no arquivo `documentacao_backup-portfolio-link-in-bio.rar` usa HTML5, CSS3 e JavaScript puro, sem frameworks, backend, banco de dados, analytics ou etapa de compilação.

> **Antes de publicar:** esta cópia contém valores de exemplo. Atualize nome, avatar, links, Discord, e-mail e domínio nas configurações do perfil e nas prévias de compartilhamento do `index.html`.

## Recursos

- Perfil com avatar, nome, apresentação e texto com efeito de digitação.
- Borda colorida animada no avatar, tema escuro e cartões com iluminação e sombras.
- Cartões de acesso para X/Twitter, YouTube, Steam e Discord.
- Cópia do usuário Discord para a área de transferência e contato por e-mail.
- Galeria de imagens ultrawide com navegação horizontal e visualização ampliada.
- Prévia de compartilhamento personalizada no Discord com botões de redes sociais.
- Layout responsivo, foco visível, navegação por teclado e preferência por movimento reduzido.
- Font Awesome Free armazenado localmente.

## Estrutura do projeto

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
    │   ├── favicon.png
    │   └── gallery/
    │       ├── aurora.svg
    │       ├── bruxo_00001.jpg
    │       ├── Grounded2_gameplayoflove.jpg
    │       ├── horizonte.svg
    │       ├── MyTimeatSandrocksolo.jpg
    │       ├── oceano.svg
    │       ├── oldbloodface.jpg
    │       └── palbad.jpg
    └── vendor/
        └── fontawesome/
            ├── css/
            │   └── all.min.css
            └── webfonts/
```

As cinco imagens JPG são as que aparecem na galeria do HTML. Os arquivos SVG também estão incluídos na pasta de imagens, mas não são referenciados pelas figuras atuais da galeria.

## Requisitos

- Um navegador moderno.
- Para visualizar a prévia do Discord, um site publicado e acessível por HTTP ou HTTPS.
- Não é necessário instalar pacotes ou executar um processo de build.

## Executar localmente

Abra `index.html` no navegador. Para testar com um servidor local, navegue até a pasta do projeto e execute:

```sh
python -m http.server 8000
```

Acesse <http://localhost:8000>.

## Configurar antes da publicação

No `index.html`, encontre o bloco `profile-config` logo após a abertura do `<body>` e substitua os dados de exemplo:

| Atributo | O que configurar |
| --- | --- |
| `data-name` | Seu nome ou apelido. O valor de exemplo é `Alex`. |
| `data-bio` | Uma apresentação curta. |
| `data-text` | A frase exibida com efeito de digitação. |
| `data-avatar` | Caminho relativo da sua imagem de perfil. |
| `data-x` | URL completa do seu perfil X/Twitter. |
| `data-youtube` | URL completa do seu canal no YouTube. |
| `data-steam` | URL completa do seu perfil na Steam. |
| `data-discord` | Usuário mostrado e copiado pelo cartão Discord. Substitua `SEU ID DO DISCORD`. |
| `data-email` | Seu endereço de e-mail, por exemplo `seuemail@dominio.com`. |

Os links de X, YouTube e Steam no arquivo são endereços genéricos. Troque-os pelos links diretos para os seus perfis. Para ocultar um dos cartões ou o botão de e-mail, deixe o atributo correspondente vazio.

### Avatar e favicon

Coloque o avatar em `assets/img/` e aponte `data-avatar` para o arquivo existente. Por exemplo:

```html
data-avatar="assets/img/avatar-placeholder.png"
```

O avatar do navegador pode ser JPEG, PNG, GIF (inclusive animado), WebP, SVG ou AVIF. Se ele não carregar, a página usa `assets/img/avatar-placeholder.png` como alternativa. Substitua `assets/img/favicon.png` para personalizar o favicon.

> No arquivo recebido, `data-avatar` aponta para `assets/img/avatar-placeholder`, sem a extensão `.png`. Atualize o caminho para um arquivo existente antes de publicar.

### Cartões sociais

As URLs de destino vêm dos atributos `data-x`, `data-youtube` e `data-steam`. O título, a descrição e o texto de ação dos cartões são editados diretamente no HTML, em cada elemento `social-card`. As regras de apresentação e as cores ficam em `assets/css/styles.css`.

O cartão do Discord copia o texto configurado em `data-discord`; não abre uma página de Discord. O botão de e-mail usa o endereço em `data-email`.

### Galeria ultrawide

As imagens usadas atualmente estão em `assets/img/gallery/` e são apresentadas em formato panorâmico. A galeria mostra até quatro imagens em telas grandes, duas em telas médias e uma em celulares. Use as setas ou deslize horizontalmente para navegar; selecione uma imagem para abri-la ampliada.

Para adicionar ou substituir uma imagem:

1. Copie o arquivo para `assets/img/gallery/`.
2. Edite ou copie um `<figure class="gallery-item">` no `index.html`.
3. Atualize `src`, `alt`, `figcaption`, `aria-label` e `data-gallery-index`.

Mantenha os índices em sequência, começando por `0`, para que a navegação e a ampliação usem a imagem correta.

### Aparência

As cores principais, fundos e sombras são definidos por variáveis no início de `assets/css/styles.css`. Edite `--accent` para mudar o destaque geral e `--page-bg`, `--card-bg`, `--surface-bg`, `--text` ou `--muted` para ajustar o tema. As cores individuais dos cartões são definidas pelas regras `.social-card-*`.

## Prévia de compartilhamento no Discord

O `<head>` contém tags Open Graph e Twitter Cards para a prévia padrão, além de `<script id="discord:component-embed">` com o embed personalizado do Discord. Ele exibe um avatar, texto de perfil e botões para X/Twitter, YouTube e Steam.

**O HTML do arquivo recebido ainda contém valores de exemplo:** `Alex`, `https://seusite.com`, URLs genéricas de redes, `ID DO DISCORD` e uma URL de imagem sem extensão. Antes de publicar, substitua esses valores pelos seus dados e confirme que a imagem escolhida existe e pode ser carregada publicamente. Use `seusite.com` como domínio ilustrativo e `seuemail@dominio.com` como e-mail ilustrativo neste documento.

Ao configurar o perfil, atualize também:

1. O bloco `profile-config`, usado pela página.
2. As tags `og:title`, `og:description`, `og:image`, `og:url` e as tags `twitter:*`.
3. O JSON dentro de `<script id="discord:component-embed">`, incluindo nome, texto, URL do avatar e URLs dos botões.

Esses metadados são estáticos: o crawler do Discord busca o HTML publicado e não executa `main.js`. Portanto, as alterações feitas apenas no bloco `profile-config` não atualizam automaticamente o embed. Use URLs HTTPS absolutas e publicamente acessíveis para o domínio e as imagens. O payload do component embed deve permanecer abaixo de 3.000 bytes. Se o embed personalizado não for exibido, as tags Open Graph fornecem a prévia padrão; o Discord também pode manter a prévia em cache.

Referências oficiais:

- [Discord — Link Previews](https://docs.discord.com/developers/link-previews/overview)
- [Discord — Component Embeds](https://docs.discord.com/developers/link-previews/component-embeds)

## Publicação

O site pode ser publicado em qualquer hospedagem estática, como GitHub Pages, Netlify, Vercel ou servidor próprio. Envie a pasta completa sem alterar a estrutura de `assets/`; o `index.html` deve ficar na raiz publicada. Nenhuma compilação é necessária.

### GitHub Pages

1. Crie um repositório e envie os arquivos do projeto.
2. Abra **Settings → Pages**.
3. Em **Build and deployment**, selecione **Deploy from a branch**.
4. Escolha a branch e a pasta `/ (root)` e salve.
5. Aguarde o GitHub Pages publicar o endereço do site.

Se usar um domínio próprio, atualize `og:url`, as URLs `og:image` e `twitter:image`, o endereço do avatar no embed Discord e os links dos botões do embed. Publique novamente e cole o link em uma conversa no Discord para verificar a prévia.

## Privacidade e acessibilidade

O projeto não contém analytics, rastreadores, login, painel de edição ou backend. O cartão Discord copia o texto no navegador; os links externos usam nova aba com `noopener noreferrer`. A página usa HTML semântico, texto alternativo, rótulos acessíveis, foco visível, alvos de toque de pelo menos 44 px e respeita `prefers-reduced-motion`.

## Créditos

Os ícones usam Font Awesome Free 6.7.2, incluído localmente. Consulte as [licenças do Font Awesome](https://fontawesome.com/license/free): ícones sob CC BY 4.0, fontes sob SIL OFL 1.1 e código sob MIT.
