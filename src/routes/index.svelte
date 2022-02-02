<script>
  import JSZip from "jszip";
  import { saveAs } from "file-saver";
  import { v4 } from "uuid";

  let renderer;
  let layers = {};
  let resolutionSet = false;
  let progress = 0;

  // Generate image from array of files
  let generateImage = async (files) => {
    const ctx = renderer.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Loop over images and draw them on the canvas
    for (let image of files) {
      await new Promise((resolve) => {
        const reader = new FileReader();
        reader.addEventListener("load", (e) => {
          const img = new Image();
          // Wait for image to load
          img.addEventListener("load", () => {
            // Auto resolution handler, set resolution by first image
            if (!resolutionSet) {
              ctx.canvas.width = img.width;
              ctx.canvas.height = img.height;
              resolutionSet = true;
            }

            // Draw image & resolve promise for this image
            ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
            resolve();
          });
          img.src = e.target.result;
        });
        reader.readAsDataURL(image);
      });
    }
  };

  // https://stackoverflow.com/a/44344803
  function* cartesian(head, ...tail) {
    let remainder = tail.length ? cartesian(...tail) : [[]];
    for (let r of remainder) for (let h of head) yield [h, ...r];
  }

  // https://www.w3docs.com/snippets/javascript/how-to-sort-javascript-object-by-key.html
  const sortObject = (obj) =>
    Object.keys(obj)
      .sort()
      .reduce((res, key) => ((res[key] = obj[key]), res), {});
</script>

<div class="grid gap-3 justify-center">
  <div class="text-center">
    <h1 class="text-xl font-semibold text-sky-500">📸 NFT Generator</h1>
    <p>Generate 1000s of NFT pictures in seconds from components</p>
  </div>

  <div class="flex gap-3 justify-center">
    <label class="btn bg-sky-100 text-sky-700 hover:bg-sky-200 cursor-pointer">
      <input
        class="hidden"
        type="file"
        webkitdirectory
        on:change={(e) => {
          // Loop over files from the folder and sort them into the layers
          [...e.target.files].forEach((file) => {
            const path = file.webkitRelativePath.split("/").slice(1).join("/");
            // Ignore files that are not on the right level
            if (path.split("/").length != 2) return;
            const [folder, name] = path.split("/");
            layers[folder] = layers.hasOwnProperty(folder) ? [...layers[folder], file] : [file];
          });
          layers = sortObject(layers);
          resolutionSet = false;
        }}
      />
      {Object.keys(layers).length ? "✅ Selected" : "Select Folder"}
    </label>
    <button
      class="btn bg-sky-100 text-sky-700 hover:bg-sky-200"
      on:click={async () => {
        var zip = new JSZip();

        // Loop over all possible combinations
        const possibilities = [...cartesian(...Object.values(layers).filter((l) => l))];
        for (let i in possibilities) {
          progress = i / possibilities.length;
          await generateImage(possibilities[i]);
          let data = renderer.toDataURL();
          zip.file(`${v4()}.png`, data.substr(data.indexOf(",") + 1), { base64: true });
        }

        zip.generateAsync({ type: "blob" }).then((content) => {
          saveAs(content, `${v4()}.zip`);
          progress = 2;
        });
      }}>Generate</button
    >
  </div>

  {#if progress > 0 && progress < 1}
    <div class="w-full bg-sky-100 rounded-full h-3">
      <div
        class={"bg-sky-300 h-3 rounded-full " + (progress > 0.95 ? "animate-pulse" : "")}
        style={`width:${progress * 100}%`}
      />
    </div>
  {/if}

  <div class="text-center">
    <h2 class="text-lg font-semibold text-zinc-600">How to use</h2>
    <p class="text-zinc-500 mb-4">
      Select a folder with a subfolder for each component layer,<br /> layer position is sorted by folder name, for example:
    </p>
    <div class="flex justify-center mb-4">
      <div class="bg-sky-100 rounded-md w-24 h-16 p-1">1-bg/</div>
      <div class="bg-sky-200 rounded-md w-24 h-16 p-1 -ml-4">2-body/</div>
      <div class="bg-sky-300 rounded-md w-24 h-16 p-1 -ml-4">3-face/</div>
    </div>
    <a class="btn bg-sky-100 text-sky-700 hover:bg-sky-200 inline-block" href="example.zip" rel="external">Download Example</a>
  </div>

  <canvas bind:this={renderer} class="hidden" />
</div>
