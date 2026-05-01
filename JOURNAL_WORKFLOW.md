# Journal Publishing Workflow

When a new journal post is ready to distribute:

1. Add a markdown file to `content/journal/` with frontmatter for `title`, `date`, `excerpt`, `category`, `author`, `read_time`, `cover_image`, `cover_alt`, `credits`, and `status`.
2. Add the required greyscale cover image to `public/images/journal/`.
3. Set `status: published`, push the repo, and deploy the site. The post will appear at `sympathetictechnology.com/journal/[slug]`.
4. In Cakemail, create a new campaign and write 150-250 words introducing the piece. This is the newsletter copy, not the article.
5. Include one CTA button: "Read the full piece" linking to the live post URL.
6. Send to the Cakemail subscriber list.

The post lives on the site permanently. The newsletter drives traffic to it. New visitors can read the archive without subscribing, and subscribers get a personal note whenever something new is worth reading.

The subscribe form on the site needs the Cakemail list endpoint or embed code before it can submit signups.
