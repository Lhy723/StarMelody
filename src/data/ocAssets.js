const asset = (path) => encodeURI(`/OC/${path}`);

export const avatars = [
  {
    title: "Cloud Bell",
    src: asset("头像/ChatGPT Image 2026年4月23日 18_00_22.png"),
  },
  {
    title: "Snow Wink",
    src: asset("头像/ChatGPT Image 2026年4月23日 18_02_21.png"),
  },
];

export const characterSheets = [
  "人设/ChatGPT Image 2026年4月23日 17_34_09.png",
  "人设/ChatGPT Image 2026年4月23日 17_38_04.png",
  "人设/ChatGPT Image 2026年4月23日 17_40_39.png",
  "人设/ChatGPT Image 2026年4月23日 18_48_02.png",
  "人设/ChatGPT Image 2026年4月23日 19_10_13.png",
  "人设/ChatGPT Image 2026年4月23日 19_12_08.png",
  "人设/ChatGPT Image 2026年4月25日 16_16_42.png",
].map((path, index) => ({
  id: `sheet-${index + 1}`,
  title: `Look ${String(index + 1).padStart(2, "0")}`,
  src: asset(path),
  category: "人设",
}));

const illustrationPaths = [
  "插画/ChatGPT Image 2026年4月23日 17_54_16.png",
  "插画/ChatGPT Image 2026年4月23日 17_57_14.png",
  "插画/ChatGPT Image 2026年4月23日 18_06_54.png",
  "插画/ChatGPT Image 2026年4月23日 18_09_02.png",
  "插画/ChatGPT Image 2026年4月23日 18_17_46.png",
  "插画/ChatGPT Image 2026年4月23日 18_19_42.png",
  "插画/ChatGPT Image 2026年4月27日 01_03_38.png",
  "插画/ChatGPT Image 2026年4月27日 01_06_29.png",
  "插画/ChatGPT Image 2026年4月27日 01_09_02.png",
  "插画/ChatGPT Image 2026年4月27日 01_11_22.png",
  "插画/ChatGPT Image 2026年4月27日 01_14_11.png",
  "插画/ChatGPT Image 2026年4月27日 01_19_27.png",
  "插画/ChatGPT Image 2026年4月27日 01_20_36.png",
  "插画/ChatGPT Image 2026年4月27日 01_22_11.png",
  "插画/ChatGPT Image 2026年4月27日 01_24_04.png",
  "插画/ChatGPT Image 2026年4月27日 01_30_49.png",
  "插画/ChatGPT Image 2026年4月27日 01_35_19.png",
  "插画/ChatGPT Image 2026年4月27日 01_36_46.png",
  "插画/ChatGPT Image 2026年4月27日 01_40_43.png",
  "插画/ChatGPT Image 2026年4月27日 01_42_13.png",
  "插画/ChatGPT Image 2026年4月27日 01_44_11.png",
  "插画/ChatGPT Image 2026年4月27日 01_45_56.png",
  "插画/ChatGPT Image 2026年4月27日 01_47_25.png",
  "插画/ChatGPT Image 2026年4月27日 02_01_37.png",
  "插画/ChatGPT Image 2026年4月27日 02_03_19.png",
  "插画/ChatGPT Image 2026年4月27日 02_06_39.png",
  "插画/ChatGPT Image 2026年4月27日 02_11_30.png",
  "插画/ChatGPT Image 2026年4月27日 02_12_09.png",
  "插画/ChatGPT Image 2026年4月27日 02_13_27.png",
  "插画/ChatGPT Image 2026年4月27日 02_23_40.png",
  "插画/ChatGPT Image 2026年5月15日 16_04_12.png",
  "插画/ChatGPT Image 2026年5月15日 16_09_32.png",
  "插画/ChatGPT Image 2026年5月15日 16_39_24.png",
  "插画/ChatGPT Image 2026年5月15日 16_47_59.png",
  "插画/ChatGPT Image 2026年5月15日 16_56_22.png",
  "插画/ChatGPT Image 2026年5月15日 17_08_46.png",
  "插画/ChatGPT Image 2026年5月15日 17_34_51.png",
];

const memoryNumberFor = (index) => {
  const number = index + 1;
  return number >= 16 ? number + 1 : number;
};

export const illustrations = illustrationPaths
  .map((path, index) => {
    const memoryNumber = memoryNumberFor(index);

    return {
      id: `art-${memoryNumber}`,
      title: `Memory ${String(memoryNumber).padStart(2, "0")}`,
      src: asset(path),
      category: "插画",
      tone:
        memoryNumber % 3 === 1
          ? "snow"
          : memoryNumber % 3 === 2
            ? "dream"
            : "city",
    };
  });

const stickerPaths = [
  "表情包/ChatGPT Image 2026年5月15日 16_24_35.png",
  "表情包/ChatGPT Image 2026年5月15日 16_33_43 (1).png",
  "表情包/ChatGPT Image 2026年5月15日 16_33_43 (2).png",
  "表情包/ChatGPT Image 2026年5月15日 16_33_44 (3).png",
  "表情包/ChatGPT Image 2026年5月15日 16_33_44 (4).png",
  "表情包/ChatGPT Image 2026年5月15日 16_33_45 (5).png",
  "表情包/ChatGPT Image 2026年5月15日 16_33_46 (6).png",
  "表情包/ChatGPT Image 2026年5月15日 16_33_46 (7).png",
  "表情包/ChatGPT Image 2026年5月15日 16_33_47 (8).png",
  "表情包/ChatGPT Image 2026年5月15日 16_33_47 (9).png",
  "表情包/ChatGPT Image 2026年5月15日 16_33_48 (10).png",
  "表情包/ChatGPT Image 2026年5月15日 17_15_10 (1).png",
  "表情包/ChatGPT Image 2026年5月15日 17_15_12 (2).png",
  "表情包/ChatGPT Image 2026年5月15日 17_15_13 (3).png",
  "表情包/ChatGPT Image 2026年5月15日 17_15_13 (4).png",
  "表情包/ChatGPT Image 2026年5月15日 17_15_14 (5).png",
];

export const stickers = stickerPaths.map((path, index) => ({
  id: `sticker-${index + 1}`,
  title: `Mood ${String(index + 1).padStart(2, "0")}`,
  src: asset(path),
  category: "表情包",
}));

export const heroArt = asset("插画/ChatGPT Image 2026年4月27日 01_09_02.png");
export const profileArt = asset("人设/ChatGPT Image 2026年4月23日 17_34_09.png");
