import React, { useState } from 'react';
import AddTaskModal from '../modals/AddTaskModal'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../App";
import { View, Text, Button } from 'react-native';

type TestModalScreenProps = NativeStackScreenProps<RootStackParamList, 'TestModalScreen'>

const TestModalScreen: React.FC<TestModalScreenProps> = ({ navigation }) => {
    const [modalShown, setModalShown] = useState(false)
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button title="Add Task" onPress={() => navigation.navigate('AddTaskModal')} />
        </View>
    );

}

export default TestModalScreen