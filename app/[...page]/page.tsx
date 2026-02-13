"use client";

import { builder, BuilderComponent } from "@builder.io/react";

// On initialise Builder.io
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export default async function CatchAllPage(props: any) {
  const params = props?.params || {};
  const page = Array.isArray(params.page) ? params.page : [];
  const urlPath = "/" + page.join("/");

  // On récupère le contenu Builder.io correspondant à l’URL
  const content = await builder
    .get("page", {
      userAttributes: {
        urlPath,
      },
    })
    .toPromise();

  return (
    <div style={{ padding: 0, margin: 0 }}>
      <BuilderComponent model="page" content={content} />
    </div>
  );
}
