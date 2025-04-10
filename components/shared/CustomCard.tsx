import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Card = ({ title, description, imageUrl, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
            {/* Imagen */}
            <Image source={{ uri: imageUrl }} style={styles.cardImage} />

            {/* Contenido */}
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardDescription}>{description}</Text>
            </View>

            {/* Botón (opcional) */}
            <TouchableOpacity style={styles.cardButton} onPress={() => alert('Button pressed!')}>
                <Text style={styles.cardButtonText}>Ver más</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5, // Sombras en Android
        margin: 10,
        overflow: 'hidden', // Para que los bordes redondeados funcionen con la imagen
    },
    cardImage: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
    },
    cardContent: {
        padding: 15,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    cardDescription: {
        fontSize: 14,
        color: '#666',
    },
    cardButton: {
        backgroundColor: '#007AFF',
        padding: 10,
        alignItems: 'center',
    },
    cardButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
});

export default Card;
