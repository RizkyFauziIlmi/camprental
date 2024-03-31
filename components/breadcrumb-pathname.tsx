"use client";

import React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

export const BreadcrumbPathname = () => {
  const pathname = usePathname();

  const paths = pathname.split("/").slice(1);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map((path, index) => {
          const formatedPath = path
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());

          let pathUrls = paths.slice(0, index + 1);

          const url = "/" + pathUrls.join("/");

          return (
            <React.Fragment key={path}>
              <BreadcrumbItem>
                {index + 1 === paths.length ? (
                  <BreadcrumbPage>{formatedPath}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={url}>{formatedPath}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index + 1 < paths.length && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
