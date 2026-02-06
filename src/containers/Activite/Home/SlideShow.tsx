import AnimeCardReadComponent from "@/components/AnimeCardRead/AnimeCardReadComponent"
import withAuthorization from "@/components/Secure/withAuthorization"
import AnimeServices from "@/services/AnimeService"
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft"
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight"
import { CircularProgress, useMediaQuery, useTheme } from "@mui/material"
import Button from "@mui/material/Button"

import Grid from "@mui/material/Grid"
import MobileStepper from "@mui/material/MobileStepper"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

const SlideShow = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["animerecent"],
    queryFn: async () => await AnimeServices.getRecent(),
    retry: false
  })

  const [activeStep, setActiveStep] = useState(0)

  const theme = useTheme()
  const lg = useMediaQuery(theme.breakpoints.up("lg"))
  const md = useMediaQuery(theme.breakpoints.only("md"))
  const sm = useMediaQuery(theme.breakpoints.only("sm"))
  const xs = useMediaQuery(theme.breakpoints.only("xs"))
  const diplayedItems = {
    [lg.toString()]: 4,
    [md.toString()]: 3,
    [sm.toString()]: 2,
    [xs.toString()]: 1
  }

  const maxSteps = (data?.length ?? 0) + 1 - diplayedItems.true

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  if (isFetching) {
    return <CircularProgress />
  }

  return data !== undefined ? (
    <>
      <Grid container spacing={1} justifyContent="center">
        {data.slice(activeStep, activeStep + diplayedItems.true).map(anime => (
          <Grid key={anime.malId} size={{ lg: 3, md: 4, xs: 12, sm: 6 }}>
            <AnimeCardReadComponent anime={anime} showEpisodeLink={anime.storageState !== null} />
          </Grid>
        ))}
      </Grid>
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      />
    </>
  ) : undefined
}

const ProtectedSlideShow = withAuthorization(SlideShow, { minLevel: "user" })

export default ProtectedSlideShow
