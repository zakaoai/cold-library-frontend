import useMyRequest from "@/hooks/containers/Activite/Request/useMyRequest"
import Grid from "@mui/material/Grid"
import RequestButton from "../RequestButton/RequestButton"
import MALInLibraryButton from "./MALInLibraryButton"
import type MALCardProps from "./interface/MALCardProps"

const MALCardBottomActions = ({ malAnime }: MALCardProps) => {
  const { createRequest, myOpenedRequestMap } = useMyRequest()

  return (
    <Grid container alignItems="center">
      <Grid item xs={2}>
        <MALInLibraryButton malAnime={malAnime} />
      </Grid>
      <Grid item xs={2}>
        <RequestButton
          request={myOpenedRequestMap[malAnime.malId]}
          createRequest={createRequest}
          animeInServer={malAnime}
        />
      </Grid>
    </Grid>
  )
}

export default MALCardBottomActions
