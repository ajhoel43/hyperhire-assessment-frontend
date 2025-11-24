import { SafeAreaView } from "react-native-safe-area-context";

type ContainerProps = {
  children: React.ReactNode
}

const Container = ({ children }: ContainerProps) => {
  return (
    <SafeAreaView className={"flex-1 bg-white"}>
      {children}
    </SafeAreaView>
  )
}

export default Container;