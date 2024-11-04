import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

async function fetchMasterRef() {
  const response = await fetch("https://portfolio-niemiets.cdn.prismic.io/api/v2");
  const data = await response.json();
  const masterRef = data.refs.find((ref: { id: string }) => ref.id === "master")?.ref;
  
  if (!masterRef) {
    throw new Error("Failed to retrieve master ref.");
  }
  
  return masterRef;
}

export default async function Page() {
  const client = createClient();
  const masterRef = await fetchMasterRef();
  const page = await client.getSingle("homepage", { ref: masterRef });
  
  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  
  const masterRef = await fetchMasterRef();
  const page = await client.getSingle("homepage", { ref: masterRef });
  
  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}