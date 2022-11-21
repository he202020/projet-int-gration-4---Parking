import {Modal, StyleSheet, View} from "react-native";
import {useEffect, useState} from "react";

export default function ParkingDetails({visible, children}) {
    const [showModal, setShowModal] = useState(visible);

    const toggleModal = () => {
        if (visible) {
            setShowModal(true);
        }
        else {
            setShowModal(false);
        }
    };

    useEffect(() => {
        toggleModal();
    }, [visible]);

    return (
        <Modal transparent visible={showModal}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>{children}</View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#252528',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 5
    }
});