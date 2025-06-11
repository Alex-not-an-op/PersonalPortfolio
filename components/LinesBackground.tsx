import { FC, useCallback, useEffect, useRef } from "react";

const oscillate = (time: number, frequency: number, phase: number) =>
  Math.cos(time * frequency + phase);

const oscillate3D: (t: number, f: number, a: Vec3D, axis: Vec3D) => Vec3D = (
  time,
  frequency,
  amp,
  axis
) => ({
  x: axis.x + amp.x * oscillate(time, frequency, 0),
  y: axis.y + amp.y * oscillate(time, frequency, Math.PI * 0.5),
  z: axis.z + amp.z * oscillate(time, frequency, 0),
});

type Vec3D = { x: number; y: number; z: number };
type Vec2D = { x: number; y: number };

// A line with 45 deg angle
class Line {
  constructor(
    private axis: Vec3D,
    private amplitude: Vec3D,

    private length: number,
    private frequency: number
  ) {}

  //periodic ocsillation
  getPosition(time: number) {
    let { x, y, z } = oscillate3D(
      time,
      this.frequency,
      this.amplitude,
      this.axis
    );

    //parallax
    y -= (window.scrollY * PARALLAX_MULT) / this.axis.z;

    return {
      start: { x, y, z },
      end: {
        x: x + Math.SQRT1_2 * this.length,
        y: y + Math.SQRT1_2 * this.length,
        z,
      },
    };
  }
}

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

//use this once, so lines arent random each page render => nextjs doesnt complain
const getRandomLineCode = (yOffset: number) => {
  const length = rand(500, 1000);
  const x = rand(-400, 1500);
  const y = yOffset + rand(-400, 400);
  const z = rand(1, 4);

  const xAmp = rand(10, 60);
  const yAmp = rand(10, 60);
  const zAmp = rand(5, 20);

  const frequency = rand(0.05, 0.5);

  return `new Line({x: ${x}, y:${y}, z:${z}}, {x: ${xAmp}, y:${yAmp}, z:${zAmp}}, ${length}, ${frequency}),`;
};

const PARALLAX_MULT = 0.3;
const lines = [
  new Line(
    { x: -247.88484761235412, y: -573.2981287025762, z: 2.060153046959398 },
    { x: 21.64237442423725, y: 36.80691582743165, z: 14.218677936170087 },
    590.3647852020041,
    0.13902184798487888
  ),
  new Line(
    { x: -136.86604142649986, y: -92.7269974977138, z: 1.425387785689263 },
    { x: 21.10378805674238, y: 37.27100828011895, z: 13.967259813340746 },
    926.1110332963312,
    0.05971509685344716
  ),
  new Line(
    { x: 1454.1045105687256, y: 42.62752064755932, z: 1.7685445926294001 },
    { x: 54.00380939456285, y: 31.165870703132956, z: 11.824201634746267 },
    792.2322397976072,
    0.08191437881998773
  ),
  new Line(
    { x: 604.1400729331043, y: 172.5505059160024, z: 3.785819721649681 },
    { x: 54.79866620430591, y: 28.53002808998443, z: 11.972184886460118 },
    851.8081108537631,
    0.18531672132054522
  ),
  new Line(
    { x: -221.86869182907566, y: -450.5094796919451, z: 3.265569988736242 },
    { x: 58.704470840072084, y: 31.85688364706958, z: 8.109668805460393 },
    974.5199018944301,
    0.09519150793001115
  ),
  new Line(
    { x: 378.05349137864516, y: 99.05971007763668, z: 1.232587808039686 },
    { x: 27.73119867690951, y: 57.173868505360154, z: 6.212433044886502 },
    871.4821959767187,
    0.4186099483964148
  ),
  new Line(
    { x: 738.1843331389857, y: -103.95446968716638, z: 1.3747674012704785 },
    { x: 22.085952002559647, y: 33.6253114321478, z: 18.55800274629533 },
    975.8092248953194,
    0.4825047215740517
  ),
  new Line(
    { x: 165.69079411668952, y: -90.35239453107772, z: 3.4843725797028746 },
    { x: 24.412556676678168, y: 44.58351988145957, z: 7.374700179559177 },
    683.1995376430311,
    0.2086819777823336
  ),
  new Line(
    { x: 485.154851824454, y: 451.7218557898757, z: 1.7458997961006988 },
    { x: 39.57650454008126, y: 26.56406521238682, z: 19.29810292771741 },
    674.4406974029926,
    0.3259431594853221
  ),
  new Line(
    { x: -60.28800253263802, y: 765.4107000020105, z: 3.992432368220942 },
    { x: 19.643148387350475, y: 39.03650955082685, z: 12.23936735701858 },
    933.0989039642147,
    0.48012620664674943
  ),
  new Line(
    { x: 572.8155678274117, y: 433.3835213439029, z: 3.7854992758286814 },
    { x: 21.516769402491555, y: 50.19340388842571, z: 18.85231958694117 },
    930.048124423543,
    0.1849633600566638
  ),
  new Line(
    { x: 1470.409776271949, y: 448.08344796005883, z: 3.533049202869477 },
    { x: 11.6155972542229, y: 22.386591173690775, z: 12.241159969654316 },
    954.6104515070411,
    0.11846201227795652
  ),
  new Line(
    { x: 953.4702371797707, y: 466.35610816693406, z: 2.165691276098315 },
    { x: 55.25921866591053, y: 36.538469716518904, z: 16.20940509355008 },
    632.7214689804127,
    0.1996270628302742
  ),
  new Line(
    { x: 292.96931155772734, y: 728.3667539499365, z: 2.356724446802265 },
    { x: 23.108982628322387, y: 26.40572830140735, z: 14.794494327748898 },
    636.1431816743441,
    0.4584790102441599
  ),
  new Line(
    { x: -254.39813151664265, y: 1174.0950843335743, z: 1.8869778867583005 },
    { x: 46.8896409388496, y: 16.367476076309753, z: 7.390594757586074 },
    788.683285502661,
    0.167850410541869
  ),
  new Line(
    { x: 88.88689822066425, y: 1109.3534049417185, z: 3.1123085862503888 },
    { x: 41.77115670033332, y: 48.53627800857113, z: 13.898478685744074 },
    796.3931567549026,
    0.23775950430720505
  ),
  new Line(
    { x: 1419.5083108395565, y: 1471.0491008565132, z: 2.1792046515494436 },
    { x: 40.44207015898543, y: 24.118619155930787, z: 13.600281427326605 },
    832.2858451842003,
    0.25102818215664985
  ),
  new Line(
    { x: 140.6259032372309, y: 1389.6353893453102, z: 2.0856093300243574 },
    { x: 43.09277354683255, y: 13.761125189166142, z: 5.318843560518911 },
    894.9850951095741,
    0.46216701650806336
  ),
  new Line(
    { x: -172.76180258224403, y: 1082.9229743080211, z: 2.6189142153000327 },
    { x: 46.118165558875305, y: 31.402612576488277, z: 9.543322364427864 },
    985.2600501235594,
    0.24443600648404273
  ),
  new Line(
    { x: 892.1030089801448, y: 1052.6620348796976, z: 2.981787790215953 },
    { x: 13.111335470898608, y: 45.354512777125734, z: 6.839394981001439 },
    614.1024591711077,
    0.2515387853572939
  ),
];

// use page coordinates for state, client coords for render
export const LinesBackground = () => {
  //state
  const canvasRef = useRef<HTMLCanvasElement>(undefined);
  const canvasContext = useRef<CanvasRenderingContext2D>(undefined);
  const dimensions = useRef<[number, number]>([0, 0]);

  // clients mouse position
  const mousePos = useRef<[number, number]>([400, 400]);

  const animationHandle = useRef(0);

  const lastTs = useRef(Date.now());
  const passedTime = useRef(0);

  useEffect(() => {
    // let buffer = "";
    // for (let yOff = -500; yOff < 1500; yOff += 100) {
    //   buffer += getRandomLineCode(yOff);
    //   buffer += "\n";
    // }
    // console.log(buffer);

    canvasContext.current = canvasRef.current.getContext("2d");
    const mouseListener = (e:MouseEvent) => {
      mousePos.current = [e.clientX, e.clientY];
    };

    const touchListener = (e:TouchEvent) => {
        mousePos.current = [e.touches[0].clientX, e.touches[0].clientY];
    }

    document.addEventListener("mousemove", mouseListener);
    document.addEventListener("touchmove", touchListener);
    document.addEventListener("touchstart", touchListener);

    animationHandle.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationHandle.current);
      document.removeEventListener("mousemove", mouseListener);
      document.removeEventListener("touchmove", touchListener);
      document.removeEventListener("touchstart", touchListener);
    };
  }, []);

  const animate = useCallback((ts) => {
    const context = canvasContext.current;

    //set dimensions
    dimensions.current = [window.innerWidth, window.innerHeight];
    canvasRef.current.width = dimensions.current[0];
    canvasRef.current.height = dimensions.current[1];

    //tick forward
    passedTime.current += ts - lastTs.current;
    lastTs.current = ts;

    //render
    context.clearRect(0, 0, ...dimensions.current);
    lines.forEach((line) => {
      const { start, end } = line.getPosition(passedTime.current / 300);

      context.beginPath();

      const grd = context.createRadialGradient(
        ...mousePos.current,
        20,
        ...mousePos.current,
        400
      );
      const opacity = start.z * 0.1; 
      grd.addColorStop(0, `#ffffff80`);
      grd.addColorStop(1, `rgba(255, 255, 255, ${(32 - opacity) / 1000}`); // 

      context.strokeStyle = grd;
      context.lineWidth = 2;
      context.lineCap = "round";

      context.moveTo(start.x, start.y);
      context.lineTo(end.x, end.y);
      context.closePath();
      context.stroke();
      context.strokeRect(end.x, end.y, 4, 4);
    });

    requestAnimationFrame(animate);
  }, []);

  return (
    <canvas
      className="w-screen h-screen fixed inset-0 pointer-events-none z-10"
      ref={canvasRef}
    ></canvas>
  );
};
