"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ItemSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FaTent } from "react-icons/fa6";
import { IoBedOutline } from "react-icons/io5";
import {
  GiArmBandage,
  GiBackpack,
  GiCampCookingPot,
  GiCompass,
  GiCookingGlove,
  GiFlashlight,
  GiOutbackHat,
} from "react-icons/gi";
import { convertFloatToIDR } from "@/lib/string";
import { addDays, formatDistanceToNow } from "date-fns";
import { Switch } from "@/components/ui/switch";
import { UploadDropzone } from "@/lib/uploadthing";
import { useState, useTransition } from "react";
import Link from "next/link";
import { IoMdAdd, IoMdCloseCircle } from "react-icons/io";
import { AiOutlineLoading } from "react-icons/ai";
import { MdCheckCircle, MdError } from "react-icons/md";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { BreadcrumbPathname } from "@/components/breadcrumb-pathname";
import { addItem } from "@/actions/item";

export const AddItemForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ItemSchema>>({
    resolver: zodResolver(ItemSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 1000,
      stock: 1,
      available: true,
      category: undefined,
      imageUrl: "",
      maxBookings: 1,
      maxDate: 1,
    },
  });

  const deleteFileOnServer = async (fileKey: string) => {
    if (!fileKey) return;

    // TODO: delete file in uploadthing server

    form.setValue("imageUrl", "");
  };

  const onSubmit = (values: z.infer<typeof ItemSchema>) => {
    startTransition(() => {
      addItem(values)
        .then((res) => {
          if (res) {
            toast(res.error, {
              icon: <MdError className="w-4 h-4" />,
            });
          } else {
            form.clearErrors();
            form.reset();
          }
        })
        .catch((error) => {
          console.log(error);
          toast("Something went wrong", {
            icon: <MdError className="w-4 h-4" />,
          });
        });
    });
  };

  return (
    <Form {...form}>
      <div className="flex justify-center">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-11/12 py-12"
        >
          <BreadcrumbPathname />
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Product Details</CardTitle>
                  <CardDescription>Personalized your product</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="name">Name</Label>
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                id="name"
                                type="text"
                                placeholder="your product name..."
                                className="w-full"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="description">Description</Label>
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea
                                id="description"
                                placeholder="tell me what the product is about..."
                                className="min-h-32"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Product Terms</CardTitle>
                  <CardDescription>
                    Set your product price, stock, etc
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="price">
                        Price ({convertFloatToIDR(form.watch("price"))})
                      </Label>
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                id="price"
                                onChange={(event) =>
                                  field.onChange(+event.target.value)
                                }
                                value={field.value}
                                disabled={field.disabled}
                                onBlur={field.onBlur}
                                name={field.name}
                                ref={field.ref}
                                type="number"
                                min={1000}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="stock">Stock</Label>
                      <FormField
                        control={form.control}
                        name="stock"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                id="stock"
                                onChange={(event) =>
                                  field.onChange(+event.target.value)
                                }
                                value={field.value}
                                disabled={field.disabled}
                                onBlur={field.onBlur}
                                name={field.name}
                                ref={field.ref}
                                type="number"
                                min={1}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="maxBookings">Max Bookings</Label>
                      <FormField
                        control={form.control}
                        name="maxBookings"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                id="maxBookings"
                                onChange={(event) =>
                                  field.onChange(+event.target.value)
                                }
                                value={field.value}
                                disabled={field.disabled}
                                onBlur={field.onBlur}
                                name={field.name}
                                ref={field.ref}
                                type="number"
                                min={1}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="maxDate">
                        Max Date{" "}
                        {formatDistanceToNow(
                          addDays(new Date(), form.watch("maxDate"))
                        )}
                      </Label>
                      <FormField
                        control={form.control}
                        name="maxDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                id="maxDate"
                                onChange={(event) =>
                                  field.onChange(+event.target.value)
                                }
                                value={field.value}
                                disabled={field.disabled}
                                onBlur={field.onBlur}
                                name={field.name}
                                ref={field.ref}
                                type="number"
                                min={1}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Product Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 sm:grid-cols-3">
                    <div className="grid gap-3">
                      <Label htmlFor="category">Category</Label>
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger
                                  id="category"
                                  aria-label="Select product category"
                                >
                                  <SelectValue placeholder="Select product category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="TENT">
                                  <div className="flex items-start gap-3 text-muted-foreground">
                                    <FaTent className="size-5" />
                                    <div className="grid gap-0.5">
                                      <p className="font-medium text-foreground">
                                        Tent
                                      </p>
                                    </div>
                                  </div>
                                </SelectItem>
                                <SelectItem value="SLEEP_REST">
                                  <div className="flex items-start gap-3 text-muted-foreground">
                                    <IoBedOutline className="size-5" />
                                    <div className="grid gap-0.5">
                                      <p className="font-medium text-foreground">
                                        Sleep Rest
                                      </p>
                                    </div>
                                  </div>
                                </SelectItem>
                                <SelectItem value="FURNITURE_COOK_EQUIP">
                                  <div className="flex items-start gap-3 text-muted-foreground">
                                    <GiCookingGlove className="size-5" />
                                    <div className="grid gap-0.5">
                                      <p className="font-medium text-foreground">
                                        Furniture and Cook Equip
                                      </p>
                                    </div>
                                  </div>
                                </SelectItem>
                                <SelectItem value="COOKWARE">
                                  <div className="flex items-start gap-3 text-muted-foreground">
                                    <GiCampCookingPot className="size-5" />
                                    <div className="grid gap-0.5">
                                      <p className="font-medium text-foreground">
                                        Cookware
                                      </p>
                                    </div>
                                  </div>
                                </SelectItem>
                                <SelectItem value="HYGIENE_HEALTH">
                                  <div className="flex items-start gap-3 text-muted-foreground">
                                    <GiArmBandage className="size-5" />
                                    <div className="grid gap-0.5">
                                      <p className="font-medium text-foreground">
                                        Hyginene Health
                                      </p>
                                    </div>
                                  </div>
                                </SelectItem>
                                <SelectItem value="LIGHT_ELECTRIC">
                                  <div className="flex items-start gap-3 text-muted-foreground">
                                    <GiFlashlight className="size-5" />
                                    <div className="grid gap-0.5">
                                      <p className="font-medium text-foreground">
                                        Light Electric
                                      </p>
                                    </div>
                                  </div>
                                </SelectItem>
                                <SelectItem value="NAVIGATION_SECURITY">
                                  <div className="flex items-start gap-3 text-muted-foreground">
                                    <GiCompass className="size-5" />
                                    <div className="grid gap-0.5">
                                      <p className="font-medium text-foreground">
                                        Navigation Security
                                      </p>
                                    </div>
                                  </div>
                                </SelectItem>
                                <SelectItem value="OUTDOOR_EQUIP">
                                  <div className="flex items-start gap-3 text-muted-foreground">
                                    <GiOutbackHat className="size-5" />
                                    <div className="grid gap-0.5">
                                      <p className="font-medium text-foreground">
                                        Outdoor Equip
                                      </p>
                                    </div>
                                  </div>
                                </SelectItem>
                                <SelectItem value="TRANSPORT_EQUIP">
                                  <div className="flex items-start gap-3 text-muted-foreground">
                                    <GiBackpack className="size-5" />
                                    <div className="grid gap-0.5">
                                      <p className="font-medium text-foreground">
                                        Transport Equip
                                      </p>
                                    </div>
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Product Availability</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="available"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>Availability</FormLabel>
                              <FormDescription>
                                Product can be rented if switch is active.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle>Product Image</CardTitle>
                  <CardDescription>Display of your product</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="imageUrl"
                      render={() => (
                        <FormItem>
                          <FormControl>
                            {form.watch("imageUrl") ? (
                              <div className="relative">
                                <Link
                                  href={form.watch("imageUrl") as string}
                                  target="_blank"
                                >
                                  <Image
                                    src={form.watch("imageUrl") as string}
                                    alt={form.watch("imageUrl") as string}
                                    className="rounded-lg w-full object-contain"
                                    width={300}
                                    height={300}
                                  />
                                </Link>
                                <IoMdCloseCircle
                                  className="w-6 h-6 absolute -top-3 -right-3 cursor-pointer z-30"
                                  onClick={() =>
                                    deleteFileOnServer(
                                      form.watch("imageUrl") as string
                                    )
                                  }
                                />
                              </div>
                            ) : (
                              <>
                                <UploadDropzone
                                  endpoint="imageUploader"
                                  className="border-dashed text-primary"
                                  onClientUploadComplete={(res) => {
                                    // set imageUrl to field
                                    form.setValue("imageUrl", res[0].url);

                                    toast(
                                      `${res[0].name} Uploaded Successfully`,
                                      {
                                        icon: (
                                          <MdCheckCircle className="w-4 h-4" />
                                        ),
                                      }
                                    );
                                  }}
                                  onUploadError={(error: Error) => {
                                    toast("Upload Error", {
                                      description: `[ERROR]: ${error.message}`,
                                      icon: <MdError className="w-4 h-4" />,
                                    });
                                  }}
                                />
                              </>
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <AiOutlineLoading className="animate-spin w-4 h-4 mr-2" />
                ) : (
                  <IoMdAdd className="w-4 h-4 mr-2" />
                )}
                {isPending ? "Creating" : "Create"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Form>
  );
};
