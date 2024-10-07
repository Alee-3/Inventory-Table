import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Modal, Pressable } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass, faArrowRight, faArrowLeft, faSliders } from '@fortawesome/free-solid-svg-icons';

const inventoryData = [
    { name: 'Selang', ctg: 'Tech', sku: 'SLG1', qty: 3, loc: 'WH1' },
    { name: 'Pipa', ctg: 'Tech', sku: 'PP1', qty: 1, loc: 'WH3' },
    { name: 'Dripstick', ctg: 'Tech', sku: 'DP1', qty: 1, loc: 'WH4' },
    { name: 'Cocopit', ctg: 'Agro', sku: 'CCP1', qty: 1, loc: 'WH5' },
    { name: 'Pupuk A', ctg: 'Agro', sku: 'PPUKA1', qty: 1, loc: 'WH2' },
    { name: 'Pupuk B', ctg: 'Agro', sku: 'PPUKB1', qty: 1, loc: 'WH1' },
    { name: 'Baut', ctg: 'Tech', sku: 'BT1', qty: 1, loc: 'WH3' },
    { name: 'Besi', ctg: 'Tech', sku: 'BS1', qty: 1, loc: 'WH16' },
    { name: 'Case', ctg: 'Tech', sku: 'CS1', qty: 1, loc: 'WH1' },
    { name: 'Stick', ctg: 'Tech', sku: 'STK1', qty: 1, loc: 'WH1' },
    { name: 'Lemari', ctg: 'Tech', sku: 'LEM1', qty: 2, loc: 'WH2' },
    { name: 'Kursi', ctg: 'Tech', sku: 'KUR1', qty: 3, loc: 'WH2' },
    { name: 'Meja', ctg: 'Tech', sku: 'MEJ1', qty: 2, loc: 'WH3' },
    { name: 'Kipas', ctg: 'Tech', sku: 'KIP1', qty: 1, loc: 'WH4' },
    { name: 'Lampu', ctg: 'Tech', sku: 'LAM1', qty: 5, loc: 'WH5' },
    { name: 'TV', ctg: 'Tech', sku: 'TV1', qty: 2, loc: 'WH2' },
    { name: 'AC', ctg: 'Tech', sku: 'AC1', qty: 1, loc: 'WH1' },
    { name: 'Komputer', ctg: 'Tech', sku: 'KOMP1', qty: 4, loc: 'WH3' },
    { name: 'Printer', ctg: 'Tech', sku: 'PRI1', qty: 2, loc: 'WH2' },
    { name: 'Mouse', ctg: 'Tech', sku: 'MOU1', qty: 10, loc: 'WH4' },
    { name: 'Keyboard', ctg: 'Tech', sku: 'KEY1', qty: 6, loc: 'WH5' },
    { name: 'Monitor', ctg: 'Tech', sku: 'MON1', qty: 3, loc: 'WH1' },
    { name: 'Laptop', ctg: 'Tech', sku: 'LAP1', qty: 2, loc: 'WH2' },
    { name: 'Charger', ctg: 'Tech', sku: 'CHA1', qty: 10, loc: 'WH1' },
    { name: 'Headset', ctg: 'Tech', sku: 'HED1', qty: 7, loc: 'WH3' },
    { name: 'Harddisk', ctg: 'Tech', sku: 'HD1', qty: 5, loc: 'WH4' },
    { name: 'Flashdisk', ctg: 'Tech', sku: 'FD1', qty: 8, loc: 'WH5' },
    { name: 'Kabel LAN', ctg: 'Tech', sku: 'LAN1', qty: 15, loc: 'WH2' },
    { name: 'Modem', ctg: 'Tech', sku: 'MOD1', qty: 4, loc: 'WH1' },
    { name: 'Router', ctg: 'Tech', sku: 'ROU1', qty: 3, loc: 'WH3' },
];

const TableScreen = () => {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10); // Default 10 items per page
    const [modalVisible, setModalVisible] = useState(false); // State for modal

    // Filter data based on search input
    const filteredData = inventoryData.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.ctg.toLowerCase().includes(search.toLowerCase()) ||
        item.sku.toLowerCase().includes(search.toLowerCase())
    );

    // Calculate the total pages and the current page data
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startItem = (currentPage - 1) * itemsPerPage;
    const endItem = startItem + itemsPerPage;

    const currentData = filteredData.slice(startItem, endItem);

    // Pagination Handlers
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleItemsPerPageChange = (number) => {
        setItemsPerPage(number);
        setCurrentPage(1); // Reset to first page when changing items per page
        setModalVisible(false); // Close modal
    };

    return (
        <View style={styles.container}>

            {/* Search Bar */}
            <View style={styles.searchBarContainer}>
                <FontAwesomeIcon icon={faMagnifyingGlass} size={24} color="#000" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search"
                    value={search}
                    onChangeText={setSearch}
                />
                {/* Icon untuk membuka modal pengaturan jumlah item */}
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <FontAwesomeIcon icon={faSliders} size={24} color="#000" />
                </TouchableOpacity>
            </View>

            {/* Table Header */}
            <View style={styles.tableHeader}>
                <Text style={styles.headerCell}>Name</Text>
                <Text style={styles.headerCell}>CTG</Text>
                <Text style={styles.headerCell}>SKU</Text>
                <Text style={styles.headerCell}>Qty</Text>
                <Text style={styles.headerCell}>LOC</Text>
            </View>

            {/* Table */}
            {currentData.length > 0 ? (
                <FlatList
                    data={currentData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.row}>
                            <Text style={styles.cell}>{item.name}</Text>
                            <Text style={styles.cell}>{item.ctg}</Text>
                            <Text style={styles.cell}>{item.sku}</Text>
                            <Text style={styles.cell}>{item.qty}</Text>
                            <Text style={styles.cell}>{item.loc}</Text>
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.noDataText}>No items found</Text>
            )}

            {/* Pagination */}
            <View style={styles.pagination}>
                <TouchableOpacity onPress={handlePrevPage} disabled={currentPage === 1}>
                    <FontAwesomeIcon icon={faArrowLeft} size={24} color={currentPage === 1 ? '#ccc' : '#000'} />
                </TouchableOpacity>
                <Text style={styles.pageNumber}>{currentPage}</Text>
                <TouchableOpacity onPress={handleNextPage} disabled={currentPage === totalPages}>
                    <FontAwesomeIcon icon={faArrowRight} size={24} color={currentPage === totalPages ? '#ccc' : '#000'} />
                </TouchableOpacity>
            </View>

            {/* Modal for changing number of items per page */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select Items Per Page</Text>
                        <TouchableOpacity onPress={() => handleItemsPerPageChange(5)} style={styles.modalButton}>
                            <Text style={styles.modalButtonText}>5 Items</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleItemsPerPageChange(10)} style={styles.modalButton}>
                            <Text style={styles.modalButtonText}>10 Items</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleItemsPerPageChange(15)} style={styles.modalButton}>
                            <Text style={styles.modalButtonText}>15 Items</Text>
                        </TouchableOpacity>
                        <Pressable style={styles.modalButtonClose} onPress={() => setModalVisible(false)}>
                            <Text style={styles.modalButtonText}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#ffffff',
    },
    searchBarContainer: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        marginBottom: 15,
    },
    searchInput: {
        marginLeft: 10,
        fontSize: 18, // Ukuran lebih besar agar lebih jelas
        fontWeight: 'bold', // Menebalkan teks Search
        color: '#000',
        flex: 1,
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        backgroundColor: '#e0e0e0',
        borderBottomWidth: 2,
        borderBottomColor: '#bbb',
    },
    headerCell: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold', // Teks header ditebalkan
        color: '#000',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: '#ffffff',
    },
    cell: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
        color: '#000',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    pageNumber: {
        fontSize: 16,
        marginHorizontal: 10,
        color: '#000',
    },
    noDataText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#ff0000',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalButton: {
        width: '100%',
        padding: 10,
        backgroundColor: '#1c1c1e',
        marginBottom: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    modalButtonClose: {
        width: '100%',
        padding: 10,
        backgroundColor: '#aaa',
        borderRadius: 5,
        alignItems: 'center',
    },
});

export default TableScreen;
