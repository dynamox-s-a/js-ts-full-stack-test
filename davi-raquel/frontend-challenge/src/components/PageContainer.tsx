import { Box, useTheme } from "@mui/material"
import { PageHeader } from "./PageHeader"
import { PageTitle } from "./PageTitle"

import bgImage from "../assets/img/grafismo.png"

interface IPageContainer extends React.HTMLAttributes<HTMLDivElement> {}

export const PageContainer = ({ ...props }: IPageContainer) => {
  const theme = useTheme()
  return (
    <Box>
      <Box
        component="img"
        sx={{
          position: "fixed",
          zIndex: -10,
          objectFit: "none",
          height: "100vh",
          width: "100vw",
          content: {
            xs: "none", //img src from xs up to md
            md: `url(${bgImage})`, //img src from md and up
          },
          bgcolor: theme.palette.primary.main,
        }}
        alt={`Dynapredict`}
        // src={bgImage}
      />
      <PageHeader />
      <PageTitle />
      {props.children}
    </Box>
  )
}