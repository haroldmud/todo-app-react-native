import { Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [list, setList] = useState(['Meditating', 'Read book', 'Work']);
  const [task, setTask] = useState('');
  const [id, setId] = useState(null)
  function addItem(){
    let newList= [...list];
    if(task.length && task.length < 10){
      newList.push(task);
      setTask('')
    }
      
    if(task.length > 10){
      alert('Your task should have less than ten letters')
      setTask(task)
    }
      
    setList(newList);
    
  }

  function deleteItem(id, idx){
    setId(idx);
    setList(prev => prev.filter((remove) => list.indexOf(remove) !== id));
  }

  return (
    <View className="flex-1 items-center mt-20 bg-white">
      <Text className='text-4xl font-bold text-blue-300 mb-12'>TODO LIST</Text>
      <TextInput 
        className='border-2 border-blue-300 rounded-lg w-6/12 pl-2 py-2 text-blue-300' 
        placeholder='enter your task'
        onChangeText={(e)=> setTask(e)}
        onSubmitEditing={addItem}
        value={task}
      />
      <View className='grid gap-2 mt-6 h-64 w-6/12 mx-auto pr-2'>
        {
          list.map((item, index) => (
            <View key={index} className='flex flex-row justify-between'>
              <Text className='text-blue-400 font-bold text-2xl	 w-8/12 overflow-y-hidden'>{item}</Text>
              <TouchableOpacity onPress={()=> deleteItem(index, id)}>
                <Image source={require('./assets/remove.png')} className='w-3 h-3 my-auto'/>
              </TouchableOpacity>
            </View>
          ))
        }
      </View>
    </View>
  );
}
