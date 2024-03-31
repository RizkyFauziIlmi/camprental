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
        {paths.map((path, index) => (
          <React.Fragment key={path}>
            <BreadcrumbItem>
              {index + 1 === paths.length ? (
                <BreadcrumbPage>
                  {path
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={`/${path}`}>
                  {path
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index + 1 < paths.length && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
