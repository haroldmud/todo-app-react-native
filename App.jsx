import { Text, View, TextInput, Image, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [list, setList] = useState([
    { name: "Meditating", edited: false },
    { name: "Reading", edited: false },
    { name: "Sport", edited: false }
  ]);
  const [task, setTask] = useState("");
  const [edit, setEdit] = useState('');
  const [id, setId] = useState(null);
  const [disable, setDisable] = useState(true);

  const getListData = async() => {
    try{
      const storedList = await AsyncStorage.getItem('Tasks');
      if(storedList !== null) {
        setList(JSON.parse(storedList));
      }
    }catch(error){
      console.error(error)
    }
  }

  const storeListData = async(updataList) => {
    try{
      const response = JSON.stringify(updataList);
      await AsyncStorage.setItem('Tasks', response);
    }catch(error){
      console.error(error)
    }
  };

  useEffect(()=>{
    getListData();
  },[])

  useEffect(()=>{
    storeListData(list)
  },[list]);

  function addItem() {
    let newList = [...list];
    if (task.length && task.length < 20) {
      newList.push({ name: task, edited: false });
      setTask("");
    }

    if (task.length > 20) {
      alert("Don't exceed 20 characters");
      setTask(task);
    }
    setList(newList);
  }

  function deleteItem(id, idx) {
    setId(idx);
    setList((prev) => prev.filter((remove) => list.indexOf(remove) !== id));
  }

  function editItem(idx) {
    setId(idx);
    let newList = [...list];
    newList = newList.map((item, index) => {
      if (index === idx) {
        item.edited = true;
        setEdit(item.name);
        return item;
      } else {
        return item;
      }
    });
    setDisable(false);
    setList(newList);
  }

  function submitEditItem() {
    let newList = [...list];
    newList = newList.map((item) => {
      if (item.edited === true) {
        item.name = edit;
        item.edited = false;
        return item;
      } else {
        return item;
      }
    });
    setDisable(true);
    setList(newList);
  }

  return (
    <View className="flex-1 items-center mt-20 bg-white">
      <Text className="text-4xl font-bold text-blue-300 mb-12">TODO LIST</Text>
      <TextInput
        className="border-2 border-blue-300 rounded-lg w-full max-w-sm mx-auto pl-2 py-2 text-blue-300"
        placeholder="enter your task"
        onChangeText={(e) => setTask(e)}
        onSubmitEditing={addItem}
        value={task}
      />
      <View className="grid gap-2 mt-6 h-64 w-full max-w-sm mx-auto pr-2">
        {list?.map((item, index) => (
          <View className='relative pr-4'>
            <View key={index} className="flex flex-row justify-between">
              <View className="flex flex-row gap-2">
                { disable ?
                 <TouchableOpacity onPress={() => editItem(index)}>
                  <Image
                    source={require("./assets/pen.png")}
                    className="w-5 h-5 my-auto"
                  />
                </TouchableOpacity> : 
                <TouchableOpacity>
                  <Image
                    source={require("./assets/pen-2.png")}
                    className="w-5 h-5 my-auto"
                  />
                </TouchableOpacity>
                }
                <Text className="text-blue-400 font-bold text-3xl	 w-full  mx-auto overflow-y-hidden">
                  {item.name}
                </Text>
              </View>
              {disable && 
              <TouchableOpacity onPress={() => deleteItem(index, id)}>
                <Image
                  source={require("./assets/remove.png")}
                  className="w-5 h-5 my-auto"
                />
              </TouchableOpacity>}
            </View>
            {
            item.edited && 
            (
              <TextInput
                className="border-2 border-blue-300 absolute bg-white rounded-lg w-11/12 max-w-sm mx-auto pl-2 ml-7 py-2 text-blue-300"
                onChangeText={(e) => setEdit(e)}
                onSubmitEditing={submitEditItem}
                value={edit}
              />
            )}
          </View>
        ))}
      </View>
    </View>
  );
}
