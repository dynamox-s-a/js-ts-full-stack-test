import { useDispatch, useSelector } from "react-redux";
import Chart from "../Components/Chart";
import Dashboard from "../Components/Dashboard";
import styles from "../Styles/Flowchart.module.css";
import { useEffect } from "react";
import { fetchGetFlowchart } from "../Services/Slices/getFlowchart";
import Loading from "../Components/Loading";

const Flowchart = () => {
  const dispatch = useDispatch<any>();
  const { data, error, loading } = useSelector(
    (state: any) => state.getFlowchart
  );

  useEffect(() => {
    dispatch(fetchGetFlowchart())
  }, [])

  return (
    <div className={styles.container}>
      <Dashboard />
      {!loading ? (
        <Loading size={64} type='spin' />
      ) : (
        <div className={styles.chatContainer}>
          <Chart title='Aceleração RMS' data={[data[0], data[1], data[2]]} yAxisTitle="Aceleração RMS (g)" />
          <Chart title='Temperatura' data={[data[6]]} yAxisTitle="Temperatura (g)" />
          <Chart title='Velocidade RMS' data={[data[3], data[4], data[5]]} yAxisTitle="Aceleração (g)" />
        </div>
      )}
    </div>
  );
};

export default Flowchart;