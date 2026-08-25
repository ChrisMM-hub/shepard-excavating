// TinaCMS configuration for the Shepard Excavating site.
//
// LOCAL MODE (current): `npm run dev` serves the site plus the editing UI at
// /admin/index.html. Edits write straight to the JSON files in /content and the
// images in /public/uploads on disk; commit them like any other change.
//
// GO-LIVE (later): create a Tina Cloud project connected to the GitHub repo,
// set TINA_PUBLIC_CLIENT_ID and TINA_TOKEN in Vercel, and switch the Vercel
// build command to `npm run build:tina`. See TINA-SETUP.md.
import { defineConfig } from 'tinacms';

const faqFields = [
  { type: 'string' as const, name: 'q', label: 'Question', required: true },
  { type: 'string' as const, name: 'a', label: 'Answer', required: true, ui: { component: 'textarea' as const } },
];

const seoFields = [
  {
    type: 'string' as const,
    name: 'metaTitle',
    label: 'Search Result Title',
    required: true,
    description: 'The blue link text on Google. Keep it under 60 characters.',
  },
  {
    type: 'string' as const,
    name: 'metaDesc',
    label: 'Search Result Description',
    required: true,
    ui: { component: 'textarea' as const },
    description: 'The grey text under the link on Google. Keep it under 155 characters.',
  },
];

export default defineConfig({
  branch: process.env.TINA_BRANCH || 'main',
  clientId: process.env.TINA_PUBLIC_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,
  build: { outputFolder: 'admin', publicFolder: 'public' },
  media: { tina: { mediaRoot: 'uploads', publicFolder: 'public' } },
  // Search is only wired when the token is present, so builds without it
  // (or a token rotation gap) still succeed, just without editor search.
  ...(process.env.TINA_SEARCH_TOKEN
    ? {
        search: {
          tina: {
            indexerToken: process.env.TINA_SEARCH_TOKEN,
            stopwordLanguages: ['eng'],
          },
        },
      }
    : {}),
  schema: {
    collections: [
      {
        name: 'service',
        label: 'Service Pages',
        path: 'content/services',
        format: 'json',
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: 'string', name: 'h1', label: 'Page Heading', required: true },
          ...seoFields,
          { type: 'string', name: 'lead', label: 'Intro Paragraph', required: true, ui: { component: 'textarea' } },
          { type: 'string', name: 'includedHeading', label: 'List Section Heading' },
          { type: 'string', name: 'included', label: 'What Is Included', list: true },
          { type: 'string', name: 'factors', label: 'What Affects the Price', list: true },
          { type: 'string', name: 'timeline', label: 'Timeline Paragraph', ui: { component: 'textarea' } },
          { type: 'string', name: 'expect', label: 'What to Expect Paragraph', ui: { component: 'textarea' } },
          {
            type: 'object',
            name: 'faqs',
            label: 'Page FAQs',
            list: true,
            ui: { itemProps: (item: Record<string, string>) => ({ label: item?.q || 'FAQ' }) },
            fields: faqFields,
          },
          {
            type: 'image',
            name: 'heroUpload',
            label: 'Replace Hero Photo (optional)',
            description:
              'Leave empty to keep the standard photo. Uploads are compressed automatically at publish time.',
          },
        ],
      },
      {
        name: 'location',
        label: 'Town Pages',
        path: 'content/locations',
        format: 'json',
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: 'string', name: 'h1', label: 'Page Heading', required: true },
          ...seoFields,
          { type: 'string', name: 'intro', label: 'Intro Paragraph', required: true, ui: { component: 'textarea' } },
          { type: 'string', name: 'local', label: 'Local Detail Paragraph', required: true, ui: { component: 'textarea' } },
          {
            type: 'object',
            name: 'faqs',
            label: 'Page FAQs',
            list: true,
            ui: { itemProps: (item: Record<string, string>) => ({ label: item?.q || 'FAQ' }) },
            fields: faqFields,
          },
          {
            type: 'image',
            name: 'heroUpload',
            label: 'Replace Hero Photo (optional)',
            description:
              'Leave empty to keep the standard photo. Uploads are compressed automatically at publish time.',
          },
        ],
      },
      {
        name: 'reviews',
        label: 'Customer Reviews',
        path: 'content/site',
        format: 'json',
        match: { include: 'reviews' },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: 'object',
            name: 'reviews',
            label: 'Reviews',
            list: true,
            ui: { itemProps: (item: Record<string, string>) => ({ label: item?.name || 'Review' }) },
            fields: [
              { type: 'string', name: 'quote', label: 'Review Text', required: true, ui: { component: 'textarea' } },
              { type: 'string', name: 'name', label: 'Customer Name', required: true },
              { type: 'string', name: 'date', label: 'Date (e.g. August 2026)', required: true },
              {
                type: 'string',
                name: 'source',
                label: 'Source',
                required: true,
                options: [
                  { value: 'google', label: 'Google review' },
                  { value: 'facebook', label: 'Facebook recommendation' },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'homepage',
        label: 'Homepage',
        path: 'content/site',
        format: 'json',
        match: { include: 'homepage' },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: 'object',
            name: 'hero',
            label: 'Top of Page (Hero)',
            fields: [
              {
                type: 'string',
                name: 'title',
                label: 'Big Headline',
                required: true,
                ui: { component: 'textarea' },
                description: 'Line breaks here become line breaks on the page.',
              },
              { type: 'string', name: 'phonePill', label: 'Call Button Text', required: true },
            ],
          },
          {
            type: 'object',
            name: 'features',
            label: 'Feature Sections',
            list: true,
            ui: { itemProps: (item: Record<string, string>) => ({ label: item?.heading || 'Section' }) },
            fields: [
              {
                type: 'string',
                name: 'key',
                label: 'System Name',
                required: true,
                description: 'Used by the site to place this section. Please leave as is.',
              },
              { type: 'string', name: 'heading', label: 'Heading', required: true },
              {
                type: 'string',
                name: 'paragraphs',
                label: 'Paragraphs',
                list: true,
                required: true,
                ui: { component: 'textarea' },
              },
              { type: 'string', name: 'btnLabel', label: 'Button Label', required: true },
            ],
          },
          {
            type: 'object',
            name: 'calculator',
            label: 'Material Calculator Banner',
            fields: [
              { type: 'string', name: 'heading', label: 'Heading', required: true },
              { type: 'string', name: 'body', label: 'Text', required: true, ui: { component: 'textarea' } },
            ],
          },
        ],
      },
      {
        name: 'faqs',
        label: 'Homepage FAQs',
        path: 'content/site',
        format: 'json',
        match: { include: 'faqs' },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: 'object',
            name: 'faqs',
            label: 'FAQs',
            list: true,
            ui: { itemProps: (item: Record<string, string>) => ({ label: item?.q || 'FAQ' }) },
            fields: faqFields,
          },
        ],
      },
    ],
  },
});
