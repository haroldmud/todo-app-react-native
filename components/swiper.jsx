// import { useRef } from "react";
// import { Swipeable } from "react-native-gesture-handler";
// import { DeleteAction } from "./delete";

// export const SwipeToDelete = ({ item }) => {
//   const swipeableRef = useRef(null);

//   // Handler for swiping to delete
//   const onSwipeableWillOpen = () => {
//     swipeableRef.current.close();
//     // Call the function to delete the item from your data source
//   };

//   return (
//     <Swipeable
//       ref={swipeableRef}
//       friction={2}
//       leftThreshold={30}
//       rightThreshold={40}
//       renderRightActions={(progress, dragX) => (
//         <DeleteAction progress={progress} onPress={onSwipeableWillOpen} />
//       )}
//     >
//       <View>
//         <Text className='text-blue-400 font-bold text-2xl'>{item}</Text>
//       </View>
//     </Swipeable>
//   );
// };