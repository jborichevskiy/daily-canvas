import { ponder } from "@/generated";

ponder.on("Garden:Approval", async ({ event, context }) => {
  console.log(event.params);
});

ponder.on("Garden:ApprovalForAll", async ({ event, context }) => {
  console.log(event.params);
});

ponder.on("Garden:NewCanvasPrompt", async ({ event, context }) => {
  const { entities, contracts } = context;

  const { promptId, width, height, author, palette } = event.params;

  const createdAt = new Date();
  await entities.Prompt.create({
    id: promptId.toString(),
    data: {
      width,
      height,
      author,
      palette: [...palette],
      createdAt: createdAt.getTime(),
    },
  });
});
// canvas.tokenURI = contract.tokenURI(event.params.canvasId);
// canvas.svg = contract.getTileSVG(event.params.canvasId);

ponder.on("Garden:CanvasDrawn", async ({ event, context }) => {
  const { entities, contracts } = context;
  const { Garden } = context.contracts;

  const { canvasId, pixels, author, canvasPromptId, canvasRiffId } =
    event.params;
  console.log("canavspromptid", canvasPromptId.toString());

  const svg = await Garden.read.getTileSVG([canvasId]);
  const tokenURI = await Garden.read.tokenURI([canvasId]);

  const createdAt = new Date();
  await entities.Response.create({
    id: canvasId.toString(),
    data: {
      author,
      tokenURI,
      prompt: canvasPromptId.toString(),
      svg,
      createdAt: createdAt.getTime(),
      riffCanvasId: canvasRiffId,
    },
  });
});
