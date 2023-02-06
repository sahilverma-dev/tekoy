import { FormEvent, useState } from "react";
import {
  Box,
  Button,
  Group,
  Progress,
  ScrollArea,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../api";

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

// props
interface PropType {
  close: () => void;
}

const CreateRoom = ({ close }: PropType) => {
  const { user } = useAuth();

  const [selectFromLibrary, setSelectFromLibrary] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const uploadImage = async (image: any) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    const { data } = await axios({
      url: "https://api.imgbb.com/1/upload",
      params: {
        key: "0807eea7499eb0040ce1a0cdd7ec7abc",
      },
      method: "POST",
      data: formData,
    });
    setIsLoading(false);
    form.setValues({
      ...form.values,
      thumbnail: data.data.display_url,
    });
    // console.log(data.);
  };

  const form = useForm({
    initialValues: {
      title: "",
      thumbnail: "",
      image: null,
      visibility: visibilityData[0].value,
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      const { data } = await api({
        url: "/rooms/create",
        method: "post",
        headers: {
          Authorization: `Berear ${user.token}`,
        },
        data: {
          title: form.values.title,
          thumbnail: form.values.thumbnail,
          visibility: form.values.visibility,
        },
      });
      navigate(`/room/${data.room._id}`);

      console.log(data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
          <motion.div>
            <ScrollArea style={{ height: 500 }}>
              <motion.div
                variants={container}
                initial="hidden"
                animate="visible"
                className="grid sm:grid-cols-2 p-2 md:grid-cols-3 gap-3 w-full "
              >
                {images.map((image) => (
                  <motion.button
                    type="button"
                    onClick={() => {
                      form.setValues({
                        ...form.values,
                        thumbnail: image.src,
                      });
                    }}
                    variants={item}
                    key={image.src}
                    className={`relative group aspect-video cursor-pointer shadow-xl rounded-md ${
                      form.values.thumbnail === image.src
                        ? "outline outline-4 outline-blue-500 shadow-lg shadow-blue-500/50"
                        : ""
                    }`}
                  >
                    <div
                      className={`absolute h-full w-full inset-0 group-hover:bg-black/0 transition-all rounded-md ${
                        form.values.thumbnail === image.src
                          ? "bg-black/0"
                          : "bg-black/70 "
                      } `}
                    />
                    <img
                      src={image.src}
                      alt="thumbnail"
                      className="h-full w-full object-center object-cover rounded-md"
                    />
                  </motion.button>
                ))}
              </motion.div>
            </ScrollArea>
          </motion.div>
        ) : (
          <motion.div className="flex items-center w-full min-h-[400px]">
            {form.values.image ? (
              <div className="mx-auto">
                {isLoading && <Progress value={100} animate />}
                <div
                  className={`aspect-video max-w-xl relative rounded-md overflow-hidden border mx-auto ${
                    isLoading
                      ? "opacity-50 pointer-events-none cursor-wait"
                      : ""
                  }`}
                >
                  <div className="overlay" />
                  <img
                    src={URL.createObjectURL(form.values.image)}
                    alt=""
                    className="h-full w-full object-cover origin-center"
                  />
                </div>
                <div className="flex my-2 items-center gap-2">
                  <Button
                    type="button"
                    size="xs"
                    variant="default"
                    loading={isLoading}
                    className="bg-red-500 hover:bg-red-800 text-white"
                    onClick={() =>
                      form.setValues({
                        ...form.values,
                        image: null,
                        thumbnail: "",
                      })
                    }
                  >
                    Clear
                  </Button>
                  <Button
                    type="button"
                    size="xs"
                    variant="default"
                    loading={isLoading}
                    className="bg-green-700 hover:bg-green-900 text-white disabled:bg-green-500/50 disabled:text-white disabled:cursor-not-allowed"
                    onClick={() => uploadImage(form.values.image)}
                  >
                    Upload
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
      <div className="flex my-2 justify-end items-center gap-2">
        <Button
          type="button"
          radius="md"
          variant="default"
          loading={isLoading}
          className="bg-red-500 hover:bg-red-800 text-white"
          onClick={close}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          radius="md"
          variant="default"
          loading={isLoading}
          className="bg-green-700 hover:bg-green-900 text-white disabled:bg-green-900 disabled:cursor-not-allowed"
          disabled={
            !form.values.title ||
            !form.values.thumbnail ||
            !form.values.visibility
          }
        >
          Create Room
        </Button>
      </div>
    </form>
  );
};

export default CreateRoom;
