<script>
  import JSZip from "jszip";
  import { saveAs } from "file-saver";

  let canvas;
  let layers = [];

  // Generate image from array of files
  let generateImage = (files) => {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    files.forEach((image) => {
      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        const img = new Image();
        img.addEventListener("load", () => {
          ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
        });
        img.src = e.target.result;
      });
      reader.readAsDataURL(image);
    });
  };

  let sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  // https://stackoverflow.com/a/44344803
  function* cartesian(head, ...tail) {
    let remainder = tail.length ? cartesian(...tail) : [[]];
    for (let r of remainder) for (let h of head) yield [h, ...r];
  }
</script>

<div class="grid gap-2">
  {#each layers as layer}
    <input
      type="file"
      webkitdirectory
      on:change={(e) => {
        layer.files = [...e.target.files];
      }}
    />
  {/each}
  <button
    on:click={() => {
      layers = [...layers, {}];
    }}>Add Layer</button
  >
  <button
    on:click={async () => {
      var zip = new JSZip();
      let i = 0;
      for (let files of cartesian(...layers.map((l) => l.files))) {
        generateImage(files);
        let data = canvas.toDataURL();
        zip.file(`${i++}.png`, data.substr(data.indexOf(",") + 1), { base64: true });
        await sleep(500);
      }
      zip.generateAsync({ type: "blob" }).then((content) => {
        saveAs(content, "asdjij.zip");
      });
    }}>Generate</button
  >
</div>

<canvas bind:this={canvas} />
