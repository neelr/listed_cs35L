import React, { useState } from 'react';
import { RootStackParamList } from '../routes/StackNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native';

type AddTaskModalProps = NativeStackScreenProps<RootStackParamList, 'AddTaskModal'>

const AddTaskModal: React.FC<AddTaskModalProps> = ({navigation}) => {
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Add Task Modal</Text>
            <Button title="Close" onPress={() => navigation.goBack()} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

});
export default AddTaskModal