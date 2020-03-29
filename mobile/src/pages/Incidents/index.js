import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Platform
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import api from "../../services/api";
import logoImg from "../../assets/logo.png";
import styles from "./styles";

export default function Incidents() {
  const [incendents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)

  const navigation = useNavigation();

  function navigationToDetail(incident) {
    navigation.navigate("Details", { incident });
  }

  async function loadIncidents() {
    if(loading)
      return
    
    if(total > 0 && incendents.length === total)
      return
    
    setLoading(true)
    const response = await api.get(`incidents?page=${page}`);

    setIncidents([...incendents, ...response.data]);
    setTotal(response.headers["x-total-count"]);
    setPage(page+1)
    setLoading(false)
  }

  useEffect(() => {
    loadIncidents();
  });

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#e02141"
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
      />
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>casos {total}.</Text>
        </Text>
      </View>
      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>
        Escolha um dos casos abaixo e salve o dia.
      </Text>

      <FlatList
        data={incendents}
        style={styles.incidentList}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.25}
        showsVerticalScrollIndicator={false}
        keyExtractor={incident => String(incident.id)}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>Valor:</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(incident.value)}
            </Text>

            <View style={styles.lineGray} />

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigationToDetail(incident)}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={28} color="#E02041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
