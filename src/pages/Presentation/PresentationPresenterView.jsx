import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, Typography } from "@mui/material";

import { SocketContext } from "context/socket";
import PresentationService from "services/presentationService";
import SlideService from "services/slideService";

import { StyledPaper } from "components/Paper";

import ChartSlide from "./EditPresentation/PresentationSlide/ChartSlide";
import HeadingSlide from "./EditPresentation/PresentationSlide/HeadingSlide";
import ParagraphSlide from "./EditPresentation/PresentationSlide/ParagraphSlide";
import PresentationPresenterMenu from "./PresentationPresenterMenu";

// const data = [
//   {
//     name: "option 1",
//     vote: 15,
//   },
//   {
//     name: "option 2",
//     vote: 25,
//   },
//   {
//     name: "option 3",
//     vote: 2,
//   },
//   {
//     name: "option 4",
//     vote: 10,
//   },
//   {
//     name: "option 5",
//     vote: 11,
//   },
//   {
//     name: "option 6",
//     vote: 32,
//   },
// ];

// const data1 = [
//   {
//     id: 1,
//     name: "option 1",
//     vote: 15,
//   },
//   {
//     id: 2,
//     name: "option 2",
//     vote: 25,
//   },
//   {
//     id: 3,
//     name: "option 3",
//     vote: 2,
//   },
//   {
//     id: 3,
//     name: "option 4",
//     vote: 10,
//   },
//   {
//     id: 4,
//     name: "option 5",
//     vote: 11,
//   },
//   {
//     id: 5,
//     name: "option 6",
//     vote: 32,
//   },
// ];

// const data2 = [
//   {
//     id: 1,
//     name: "mi xao",
//     vote: 15,
//   },
//   {
//     id: 2,
//     name: "com ga xoi mo",
//     vote: 25,
//   },
//   {
//     id: 3,
//     name: "nhin doi",
//     vote: 2,
//   },
// ];

// const slideList = [
//   {
//     id: 1,
//     type: 1,
//     question: "chart here",
//     data: data1,
//     content: <ChartSlide question="chart here" data={data1} />,
//   },
//   {
//     id: 2,
//     type: 2,
//     question: "heading here",
//     content: <HeadingSlide question="heading here" />,
//   },
//   {
//     id: 3,
//     type: 3,
//     question: "paragraph here",
//     paragraph: "lorem ipsum",
//     content: (
//       <ParagraphSlide question="paragraph here" paragraph="lorem ipsum" />
//     ),
//   },
//   {
//     id: 4,
//     type: 1,
//     question: "chart here",
//     data: data2,
//     content: <ChartSlide question="chart here" data={data2} />,
//   },
// ];

const PresenatationPresenterView = () => {
  const params = useParams();
  const presentationId = params.id;
  const slideId = params.slideid;
  const socket = useContext(SocketContext);
  const [slideList, setSlideList] = useState([]);
  const [currentSlide, setCurrentSlide] = useState();
  // const currentSlide = slideList.find((o) => o.id === Number(slideid));
  // const [currentSlide, setCurrentSlide] = useState();
  const [code, setCode] = useState();

  useEffect(() => {
    // socket.on("SERVER_SEND_INCREASE_VOTE", (data) => {
    //   const { presentationId, slideId, optionId } = data;
    //   if (slideList && currentSlide) {
    //     const slide = slideList.find((e) => e.id === Number(slideId));
    //     const option = slide?.content.options.find(
    //       (e) => e.id === Number(optionId)
    //     );
    //     if (option) {
    //       // console.log("option", option);

    //       const newVote = option.vote + 1;
    //       (async () => {
    //         const voteRes = await SlideService.increaseVote(
    //           presentationId,
    //           slideId,
    //           optionId,
    //           newVote
    //         );
    //         if (voteRes.success === true) {
    //           const newOption = {
    //             ...option,
    //             vote: newVote,
    //           };
    //           const indexOption = currentSlide.content.options.indexOf(option);
    //           const newOptions = currentSlide.content.options;
    //           newOptions.splice(indexOption, 1, newOption);
    //           const newCurrentSlide = {
    //             ...currentSlide,
    //             content: {
    //               ...currentSlide.content,
    //               options: newOptions,
    //             },
    //           };

    //           setCurrentSlide(newCurrentSlide);
    //         }
    //       })();
    //     }
    //   }
    // });

    (async () => {
      try {
        const slideRes = await SlideService.getSlidesByPresentationId(
          presentationId
        );

        if (slideRes.success === true) {
          setSlideList(slideRes.data);
          setCurrentSlide(slideRes.data[0]);
        }

        const codeRes = await PresentationService.getCodePresentation(
          presentationId
        );
        if (codeRes.success === true) {
          setCode(codeRes.data);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    socket.on("SERVER_SEND_INCREASE_VOTE", (data) => {
      const { presentationId, slideId, optionId } = data;
      const slide = slideList.find((e) => e.id === Number(slideId));
      const option = slide?.content.options.find(
        (e) => e.id === Number(optionId)
      );
      // console.log("option", option);

      if (option) {
        const newVote = option.vote + 1;
        (async () => {
          const voteRes = await SlideService.increaseVote(
            presentationId,
            slideId,
            optionId,
            newVote
          );
          if (voteRes.success === true) {
            const newOption = {
              ...option,
              vote: newVote,
            };
            const indexOption = currentSlide.content.options.indexOf(option);
            const newOptions = currentSlide.content.options;
            newOptions.splice(indexOption, 1, newOption);
            const newCurrentSlide = {
              ...currentSlide,
              content: {
                ...currentSlide.content,
                options: newOptions,
              },
            };

            setCurrentSlide(newCurrentSlide);
          }
        })();
      }
    });
  }, [slideList]);

  return (
    <StyledPaper
      className="presentation-presenter-view__container"
      sx={{ height: "100vh", width: "100vw", position: "relative" }}
    >
      <Box className="presentation-slide__code">
        <Typography
          variant="h5"
          sx={{
            width: "100%",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
          }}
        >
          code:&nbsp;
          <Box component="span" sx={{ fontWeight: "bold", fontSize: "2rem" }}>
            {code}
          </Box>
        </Typography>
      </Box>
      <PresentationPresenterMenu
        currentSlide={currentSlide}
        slideList={slideList}
        setSlideList={setSlideList}
        setCurrentSlide={setCurrentSlide}
      />
      <Box className="presentation-presenter-view__content">
        {(() => {
          if (currentSlide?.typeId === 1) {
            return (
              <ChartSlide
                question={currentSlide?.content.question}
                options={currentSlide?.content.options}
              />
            );
          } else if (currentSlide?.typeId === 2) {
            return (
              <HeadingSlide
                question={currentSlide?.content.heading}
                subHeading={currentSlide?.content.subHeading}
              />
            );
          } else {
            return (
              <ParagraphSlide
                question={currentSlide?.content.heading}
                paragraph={currentSlide?.content.paragraph}
              />
            );
          }
        })()}
      </Box>
    </StyledPaper>
  );
};

export default PresenatationPresenterView;
