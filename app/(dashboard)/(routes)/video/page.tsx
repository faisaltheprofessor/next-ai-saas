"use client";
import Heading from "@/components/heading";
import { VideoIcon } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import Empty from "@/components/empty";
import Loader from "@/components/loader";
import z from "zod";

const Video = () => {
  const router = useRouter();
  const [video, setVideo] = useState<string>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  let isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo(undefined);
      const response = await axios.post("/api/video", values);
      setVideo(response.data[0]);
      form.reset();
    } catch (error) {
      // TODO HANDLE
      console.log(error);
    } finally {
      isLoading = false;
      router.refresh();
    }
  };
  return (
    <div>
      <Heading
        title="Video Generation"
        description="Turn your prompt into Video."
        Icon={VideoIcon}
        bgColor="bg-orange-700/10"
        iconColor="text-orange-700"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shoad-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="A cat walking in the grass"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>

        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader waitingMessage={true} />
            </div>
          )}
          {!video && !isLoading && (
            <div>
              <Empty label="No Video generated" />
            </div>
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {video && (
              <video
                controls
                className="w-full aspect-video mt-8 rounded-lg border bg-black"
              >
                <source src={video} />
              </video>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
