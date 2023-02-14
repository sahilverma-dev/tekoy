import { Text, Loader } from "@mantine/core";

const LoaderScreen = () => {
  return (
    <div className="flex items-center flex-col gap-2 justify-center min-h-screen w-full">
      <Loader color="indigo" />

      <Text className="text-xs text-slate-800">Loading Website...</Text>
    </div>
  );
};

export default LoaderScreen;
