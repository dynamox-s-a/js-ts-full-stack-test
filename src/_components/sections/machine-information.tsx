import { Typography } from "@mui/material";
import { MachineCardsContainer } from "../../Pages/Data/data.styles";
import { MachineCards } from "../machineCards/machine-cards";

export function MachineInformationSection(){

  return(
    <>
      <Typography sx={{ color: '#692746', paddingTop: { xs: '8px', md: '40px' }, paddingBottom: { xs: '8px', md: '8px' }, fontWeight: '600', fontSize: { xs: '1.25rem', md: '2.25rem' } }}>
        Machine Information
      </Typography>
      <MachineCardsContainer>
        <MachineCards />
      </MachineCardsContainer>
    </>
  )
}