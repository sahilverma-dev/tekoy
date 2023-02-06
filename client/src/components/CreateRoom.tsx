import { useState } from "react";
import { Box, Button, Group, Select, Text, TextInput } from "@mantine/core";
import { motion, AnimatePresence } from "framer-motion";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";

// icons
import {
  MdOutlineImage as ImageIcon,
  MdOutlineImageNotSupported as ImageOutlineIcon,
} from "react-icons/md";
import { container, item } from "../constants/variants";
import { images } from "../constants/images";
import { useForm } from "@mantine/form";

const visibilityData = [
  {
    value: "public",
    label: "Public",
  },
  {
    value: "private",
    label: "Private",
  },
  {
    value: "unlisted",
    label: "Unlisted",
  },
];

const CreateRoom = () => {
  const [selectFromLibrary, setSelectFromLibrary] = useState<boolean>(false);
  const form = useForm({
    initialValues: {
      title: "",
      image: null,
      visibility: visibilityData[0].value,
    },
  });

  return (
    <>
      <Box className="flex items-center w-full gap-2">
        <TextInput
          label="Room Title"
          required
          radius="md"
          placeholder="Enter Room Title"
          className="w-full"
          {...form.getInputProps("title")}
        />
        <Select
          radius="md"
          label="Visibility"
          data={visibilityData}
          {...form.getInputProps("visibility")}
        />
      </Box>
      <Box className="flex items-center justify-between w-full my-3">
        <Text className="text-sm font-semibold">Choose a thumbnail</Text>
        <Button
          variant="subtle"
          size="xs"
          onClick={() => setSelectFromLibrary(!selectFromLibrary)}
        >
          {selectFromLibrary ? "Custom Thumbnail" : "Choose from our library"}
        </Button>
      </Box>
      <AnimatePresence initial={false}>
        {selectFromLibrary ? (
          <div>
            <motion.div
              variants={container}
              initial="hidden"
              animate="visible"
              className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 w-full h-[500px] mb:h-[400px] overflow-y-scroll"
            >
              {images.map((image) => (
                <motion.div
                  variants={item}
                  key={image.src}
                  className="relative aspect-video cursor-pointer border"
                >
                  <div className="overlay rounded-md" />
                  <img
                    src={image.src}
                    alt="thumbnail"
                    className="h-full w-full object-center object-cover rounded-md"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        ) : (
          <motion.div className="flex items-center w-full min-h-[400px]">
            {form.values.image ? (
              <div>
                <div className="aspect-video relative rounded-md overflow-hidden border">
                  <div className="overlay" />
                  <img
                    src={URL.createObjectURL(form.values.image)}
                    alt=""
                    className="h-full w-full object-cover origin-center"
                  />
                </div>
                <div>
                  <Button
                    type="button"
                    variant="default"
                    className="bg-red-500 text-white"
                    onClick={() =>
                      form.setValues({
                        ...form.values,
                        image: null,
                      })
                    }
                  >
                    Clear
                  </Button>
                </div>
              </div>
            ) : (
              <Dropzone
                onDrop={(files: FileWithPath[]) => {
                  form.setValues({
                    ...form.values,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore reason Type 'FileWithPath' is not assignable to type 'null | undefined'.
                    image: files[0],
                  });
                }}
                onReject={(files) => console.log("rejected files", files)}
                maxSize={3 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
                multiple={false}
                className="max-w-3xl w-full mx-auto"
              >
                <Group
                  position="center"
                  spacing="xl"
                  style={{
                    minHeight: 250,
                    pointerEvents: "none",
                  }}
                >
                  <Dropzone.Accept>
                    <ImageIcon size={50} className="text-blue-500" />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <ImageOutlineIcon size={50} className="text-red-500" />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <ImageIcon size={50} />
                  </Dropzone.Idle>

                  <div>
                    <Text size="xl" inline>
                      Drag images here or click to select files
                    </Text>
                    <Text size="sm" color="dimmed" inline mt={7}>
                      Attach as many files as you like, each file should not
                      exceed 5mb
                    </Text>
                  </div>
                </Group>
              </Dropzone>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CreateRoom;
