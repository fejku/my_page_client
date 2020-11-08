import React from "react";

interface Props {
  className?: string;
}

const LogoIcon: React.FC<Props> = ({ className }) => {
  return (
    <svg viewBox="0 0 1300 700" className={className}>
      <g>
        <path d="m 244.962,654.00607 c 13.43662,-19.42897 52.03266,-74.45479 85.76876,-122.27963 33.73612,-47.82502 71.70037,-104.18637 84.36491,-125.24769 l 23.02652,-38.29344 -181.42285,3.76981 c -99.78257,2.07345 -200.987622,-0.52505 -224.900084,-5.77413 -39.9923987,-8.77891 -32.8684358,-10.9696 88.878384,-27.33149 128.90167,-17.3235 242.63529,-53.21252 242.63529,-76.56456 0,-6.23462 -22.01033,-46.64993 -48.91187,-89.8117 C 277.90231,113.91346 265.59075,83.338894 265.88919,51.99866 l 0.40014,-41.998644 116.66078,123.558294 c 86.17168,91.26657 122.28582,122.48342 138.18358,119.4448 11.83751,-2.26243 63.09791,-54.15977 113.91191,-115.3273 l 92.38904,-111.214036 3.32795,37.199761 C 736.44618,127.19346 685.39721,203.68452 412.22494,540.95432 302.64422,676.24706 289.65169,688.60252 256.59733,688.95102 l -36.06545,0.38044 z" />
        <path d="m 542.31765,604.42611 c -9.03322,0.18315 -17.63865,2.93077 -25.93454,8.25692 -3.78465,2.42997 -8.46652,5.08041 -10.40392,5.88993 -1.93736,0.80945 -3.53,1.83656 -3.53872,2.28381 -0.011,0.44703 -1.82736,2.87018 -4.0422,5.38238 -9.5822,10.86777 -14.83051,28.27806 -10.40992,34.53637 0.97501,1.3803 2.68787,4.15337 3.80633,6.16151 5.64861,10.14102 18.77876,20.19219 28.93202,22.14604 v -0.003 c 6.97014,1.34121 10.61326,1.24605 18.57762,-0.48963 6.56512,-1.43004 13.50553,-4.44575 26.9971,-11.72821 5.97132,-3.22267 18.7341,-15.22871 20.78608,-19.553 2.14517,-4.52088 2.19136,-18.7144 0.0839,-25.81157 -2.70091,-9.09561 -16.4182,-21.11935 -28.10728,-24.63799 -5.75279,-1.73209 -11.3259,-2.54476 -16.74579,-2.43447 z m -1.48297,4.57949 c 5.21114,-0.0183 18.20652,2.79604 19.02572,4.12154 0.31831,0.51494 -1.04623,0.93765 -3.03319,0.93765 -2.87256,0 -3.61399,0.39462 -3.61399,1.917 0,2.41575 1.90893,3.15806 8.09036,3.15806 6.3033,0 10.06857,1.66355 14.05766,6.22095 4.27168,4.88026 6.26656,10.86022 6.26656,18.77784 0,5.76674 -0.39158,7.03622 -3.55268,11.53395 -1.95377,2.77982 -3.57286,5.40202 -3.59802,5.82645 -0.10659,1.80161 -13.29659,10.96916 -21.09341,14.66227 h 0.007 c -10.15114,4.80817 -19.40769,5.97564 -26.05941,3.2889 -2.23304,-0.90198 -5.40015,-1.88956 -7.03975,-2.19458 -1.63949,-0.30512 -5.52198,-2.07923 -8.62765,-3.94311 -9.13312,-5.4811 -21.05033,-17.63993 -17.28901,-17.63993 0.54073,0 0.98318,-0.91359 0.98318,-2.03 0,-1.11655 -0.44227,-2.03007 -0.98318,-2.03007 -0.53993,0 -0.72517,-0.67062 -0.40836,-1.49282 0.50601,-1.31875 0.75301,-1.31875 2.07165,0 2.1696,2.1696 2.31513,1.90593 1.1955,-2.14905 -0.55345,-2.00465 -0.6866,-4.40256 -0.29524,-5.32879 0.39113,-0.92637 0.77758,-2.60952 0.85824,-3.74091 0.16374,-2.29451 6.42147,-10.5633 8.13601,-10.75085 0.60443,-0.067 1.4885,-0.0494 1.96461,0.0366 0.47605,0.0857 1.67158,-0.77344 2.65652,-1.90912 0.98495,-1.1356 2.12019,-2.06571 2.52165,-2.06571 0.40095,0 2.71561,-1.43026 5.14451,-3.16594 4.10256,-2.94633 4.81285,-3.12216 10.0471,-2.46816 3.09755,0.38696 5.89414,1.12816 6.21498,1.64732 0.32125,0.51916 1.35576,0.95136 2.29971,0.95956 0.9441,0.007 2.40191,0.47454 3.23927,1.03487 1.31875,0.88253 1.26004,1.21879 -0.43407,2.5118 -1.07571,0.82091 -1.72403,1.72362 -1.44113,2.00626 0.28278,0.28279 1.59025,-0.63132 2.90626,-2.03205 1.84626,-1.96516 2.11685,-2.82337 1.18751,-3.75275 -0.66264,-0.6626 -1.20333,-2.00652 -1.20333,-2.98758 0,-0.9811 -1.58044,-3.04293 -3.51088,-4.58348 -4.0959,-3.26806 -3.2752,-4.35183 3.31066,-4.37524 z m -12.54106,22.80223 c -0.71198,-0.003 -1.47278,0.42476 -1.47278,1.0944 v 0.004 c 0,0.24359 0.71102,0.44615 1.58399,0.44615 0.87297,0 1.2989,-0.46655 0.94374,-1.03494 -0.21722,-0.35165 -0.62729,-0.50769 -1.05477,-0.50938 z m -29.51875,20.92883 c -0.23041,-0.082 -0.14689,0.3011 0.19816,1.20542 0.38132,1.00095 0.94836,1.5655 1.26096,1.25289 0.31245,-0.31245 -1.9e-4,-1.13142 -0.69392,-1.81992 -0.37594,-0.37308 -0.62693,-0.58938 -0.76517,-0.63839 z" />
        <path d="m 807.03922,10.008155 c -16.07179,-0.087692 -30.72487,0.531055 -37.08637,1.892407 -4.40257,0.942348 -8.22429,3.650117 -8.7085,6.164871 -1.18015,6.119132 10.58059,8.798359 22.52044,5.133876 5.13956,-1.577312 10.30689,-2.270758 11.48322,-1.543788 2.47894,1.531689 -2.77549,11.904722 -7.59058,14.986333 -3.75246,2.402634 -26.23912,36.222769 -28.70597,43.174128 -0.90187,2.545692 -3.11462,6.398681 -4.91326,8.565095 -7.9329,9.555766 -58.93608,114.278293 -70.34121,144.426713 -7.88462,20.83946 -24.60176,78.8268 -26.87509,93.22087 -0.91216,5.77707 -4.00652,19.9572 -6.87755,31.5113 -7.26678,29.24245 -10.28637,143.70406 -4.89791,185.69813 1.35029,10.51978 3.12135,26.25787 3.93879,34.97835 0.81678,8.72073 5.75615,29.99062 10.97066,47.26692 5.21381,17.2763 10.68161,36.14048 12.14989,41.91759 1.46879,5.7771 3.89436,13.16252 5.39051,16.41216 3.37367,7.32765 5.73945,7.34106 24.71055,0.13919 8.35854,-3.1737 17.55993,-5.95941 20.44832,-6.19044 2.88846,-0.23187 16.36384,-1.89582 29.94692,-3.69787 28.93787,-3.83913 43.35949,-4.21748 63.59194,-1.66696 18.67758,2.35472 20.26645,-0.66304 10.40124,-19.79202 -10.05593,-19.50018 -16.56765,-60.8708 -16.96604,-107.8174 -0.29121,-34.35776 0.78593,-50.59311 5.25707,-79.36289 0.87868,-5.65476 1.99707,-14.51729 2.4815,-19.69454 0.487,-5.17707 2.03315,-14.13802 3.43623,-19.91513 1.40436,-5.77707 3.26359,-17.00297 4.13377,-24.94645 3.47209,-31.68457 10.46103,-64.67167 22.52561,-106.35059 2.92652,-10.10987 7.66304,-26.94222 10.52952,-37.40427 5.42864,-19.81269 14.60333,-44.70792 18.14546,-49.24661 1.13124,-1.44796 5.28003,-10.90277 9.22179,-21.01265 12.35238,-31.68198 27.80429,-62.12617 44.39487,-87.461231 8.80224,-13.441945 16.42096,-23.190882 16.92993,-21.664014 1.87077,5.612406 5.78711,2.573458 4.30311,-3.338865 -1.13901,-4.533175 0.88901,-9.003633 7.83158,-17.314813 5.14905,-6.162791 9.36014,-13.425575 9.36014,-16.140285 0,-4.927073 -11.94684,-12.95022 -19.28413,-12.95022 -2.08473,0 -4.41444,-1.630611 -5.1803,-3.626025 -1.50227,-3.911048 -20.17652,-7.267711 -20.17652,-3.626077 0,2.237509 -19.18417,0.810157 -23.29992,-1.733447 -1.24202,-0.767381 -7.44041,-1.968224 -13.77092,-2.666905 -6.33113,-0.698604 -21.55333,-2.48952 -33.82952,-3.979776 -12.03729,-1.461381 -29.52817,-2.256572 -45.60004,-2.343927 z m 21.36648,10.057553 c 14.44279,-0.04879 70.41469,7.634128 88.57436,12.155198 30.21253,7.522003 35.60616,11.630989 25.8592,19.720241 -2.38619,1.981564 -5.66103,6.559158 -7.27264,10.170337 -1.61051,3.611183 -8.29392,14.836546 -14.8478,24.946417 -18.40008,28.386429 -35.05403,60.390339 -46.87718,90.092359 -5.92627,14.8883 -12.45649,29.65923 -14.51443,32.82426 -2.05891,3.16397 -6.80546,16.38953 -10.54989,29.38795 -7.33967,25.47689 -9.04264,31.02966 -16.91469,55.14471 -2.8289,8.66563 -5.75187,19.30066 -6.49323,23.63349 -0.74212,4.33277 -3.12179,14.37706 -5.29282,22.3205 -2.1723,7.94344 -5.20989,25.07773 -6.75472,38.07615 -1.54612,12.99835 -4.52443,32.49597 -6.61608,43.32802 -11.05729,57.26385 -15.38718,121.707 -10.81663,160.95169 2.02802,17.41447 2.9871,20.24688 5.62633,16.6378 2.73272,-3.737 3.4174,-2.85304 4.87748,6.27762 0.95853,6.00322 0.48183,12.90458 -1.09781,15.85831 -2.88293,5.38762 -2.24439,24.65649 0.92257,27.82363 4.43531,4.43553 -0.1033,5.60377 -27.75711,7.15469 -33.37311,1.87128 -58.73432,5.00824 -74.18278,9.17542 v -0.011 c -5.77707,1.55875 -11.71366,2.85872 -13.19121,2.89308 -2.43769,0.0568 -4.91271,-6.44041 -18.47395,-48.51319 C 662.676,589.28487 655.8775,518.71813 657.2827,461.01831 c 1.6363,-67.20073 2.45568,-74.72809 9.14443,-84.12245 5.50055,-7.72443 5.59902,-8.52799 1.43019,-11.57564 -4.19693,-3.06894 -4.20934,-4.49055 -0.18059,-22.60766 2.36553,-10.63252 5.86751,-24.648 7.78055,-31.14717 1.91205,-6.49926 6.70319,-23.63349 10.64733,-38.07619 6.97168,-25.52936 9.70395,-33.26274 19.46373,-55.14474 2.57685,-5.77703 7.3196,-16.69103 10.53964,-24.25406 3.22,-7.56297 6.88124,-13.11748 8.13952,-12.33987 1.25751,0.77773 1.63114,-0.30403 0.82454,-2.40548 -2.04344,-5.32168 9.30685,-27.11671 11.91927,-22.88975 1.4585,2.36068 2.4996,1.94502 3.83128,-1.5232 1.00498,-2.62117 0.60293,-5.17261 -0.89674,-5.67244 -1.63626,-0.54577 -0.61073,-5.06142 2.57425,-11.30385 2.91652,-5.7169 6.35817,-9.74132 7.64711,-8.94459 1.28842,0.79652 3.03707,0.32704 3.88252,-1.04106 0.84521,-1.36803 0.33224,-3.22933 -1.13897,-4.13888 -1.80894,-1.11786 -1.78055,-3.32961 0.1033,-6.82134 1.52036,-2.84139 3.87615,-4.47901 5.23154,-3.64141 1.35542,0.8377 1.78575,-0.24997 0.9534,-2.41556 -1.66201,-4.33124 6.67026,-20.371017 9.63209,-18.54056 1.01784,0.628264 1.68527,-0.913996 1.48685,-3.426003 -0.23187,-2.855033 1.36315,-4.428454 4.23637,-4.200506 4.88594,0.387553 6.39469,-3.265637 1.95839,-4.744142 -3.47102,-1.155422 9.31044,-25.426198 17.54037,-33.306396 7.56282,-7.241476 10.39425,-6.016718 6.17003,2.667011 -2.84406,5.846436 -2.78992,5.895019 1.1029,1.035912 2.24703,-2.803439 4.08227,-5.937963 4.08227,-6.96489 0,-1.024033 3.41637,-3.074824 7.56513,-4.492864 6.48465,-2.260396 7.42754,-3.793289 6.61633,-10.760205 -0.90703,-7.794637 -0.55143,-8.123985 8.84689,-8.154765 z m -14.12989,0.938487 c 0.94055,-0.157069 1.60535,0.422323 1.60535,1.56933 0,1.529322 -1.18275,2.779751 -2.62582,2.779751 -1.44301,0 -2.62601,-0.517128 -2.62601,-1.15415 0,-0.636967 1.18271,-1.892173 2.62601,-2.784934 0.3608,-0.224176 0.70608,-0.357363 1.02047,-0.410228 z M 669.98757,350.97512 c -0.63648,0 -1.15956,1.18176 -1.15956,2.62598 0,1.44428 1.25495,2.62593 2.77967,2.62593 1.52806,0 2.05118,-1.18176 1.15956,-2.62593 -0.89413,-1.44411 -2.14395,-2.62598 -2.77967,-2.62598 z" />
        <path d="m 1175.0227,10.004346 c -6.5928,-0.2170701 -3.236,7.552626 23.5755,59.649713 36.8083,71.519361 39.6599,78.871091 56.93,146.714641 2.6138,10.27005 5.577,28.20805 6.5855,39.862 1.009,11.6539 3.5069,28.45942 5.5487,37.34553 2.8457,12.38549 6.3312,66.05534 6.9399,106.85267 0.018,1.46707 -1.2606,18.27267 -2.8501,37.34553 -1.5888,19.07293 -3.453,43.08077 -4.142,53.35084 -0.6884,10.27 -3.1709,27.07546 -5.5122,37.34546 -11.3667,49.86168 -20.503,94.08813 -20.8038,100.69963 -0.1854,4.03465 -1.234,7.33579 -2.333,7.33579 -1.0937,0 -2.0021,1.36219 -2.0021,3.0426 0,1.68051 -2.6687,8.40172 -5.9496,14.93718 l -5.9446,11.90494 -14.7289,-1.63579 c -24.0984,-2.67241 -101.524,-2.06025 -118.7629,0.93773 -26.894,4.677 -25.9218,5.2259 -24.4765,-13.85868 0.6938,-9.17102 3.2885,-33.47762 5.7622,-54.01769 5.709,-47.4048 7.233,-227.43707 2.1582,-254.74996 -1.7716,-9.53645 -5.1154,-28.74273 -7.4297,-42.68063 -2.3145,-13.93789 -7.3182,-37.34557 -11.1184,-52.01701 -3.7996,-14.67148 -8.4341,-33.89098 -10.3001,-42.70672 -1.8669,-8.81352 -7.7184,-27.09058 -13.0043,-40.61741 -5.2855,-13.52709 -9.6124,-27.10405 -9.6124,-30.1661 0,-3.06211 -4.2014,-14.66005 -9.3364,-25.77404 -5.1351,-11.114336 -9.3875,-21.536551 -9.4509,-23.16387 -0.052,-1.627594 -6.01983,-9.550509 -13.23368,-17.604681 -9.98282,-11.145491 -13.85897,-13.900278 -16.22403,-11.535022 -5.31172,5.311601 -0.54816,22.014516 7.10638,24.924824 5.31491,2.020553 6.26663,3.771293 4.93908,9.060223 -1.15194,4.592707 0.011,8.329619 3.89205,12.493666 5.67506,6.09267 7.03381,9.41542 21.705,53.05901 21.0172,62.5218 42.2964,157.70493 47.1145,210.73564 5.733,63.09523 -0.527,220.53688 -11.4881,288.83922 -2.3039,14.3503 -3.4597,27.9952 -2.5687,30.31722 v 0.011 c 1.1864,3.09051 3.5737,3.75586 8.9196,2.46941 25.579,-6.15509 54.1597,-9.65088 81.9955,-10.02934 33.1067,-0.45018 76.8652,1.94275 88.3882,4.83491 5.2246,1.31139 8.2203,-0.17216 14.4528,-7.15341 4.3243,-4.84392 7.9616,-9.49007 8.0806,-10.32626 0.1058,-0.83626 0.6011,-4.52227 1.0671,-8.19015 0.4662,-3.66787 5.1317,-24.07454 10.3682,-45.34817 18.7353,-76.11553 20.5705,-85.43219 23.1849,-117.86146 1.4564,-18.06989 3.7794,-44.85842 5.163,-59.52989 3.1554,-33.45626 0.8872,-108.67899 -4.0222,-133.37695 -2.0418,-10.27001 -4.4858,-27.07549 -5.4341,-37.34556 -0.9481,-10.27 -2.9117,-24.07449 -4.3607,-30.6767 -1.4513,-6.60212 -3.175,-14.81298 -3.8346,-18.24558 -0.6594,-3.43254 -2.9426,-11.23513 -5.0694,-17.33896 -2.1265,-6.10387 -3.8809,-13.72867 -3.9024,-16.94307 -0.018,-3.21436 -1.2419,-6.58527 -2.7093,-7.49202 -1.4672,-0.90673 -2.6674,-4.05532 -2.6674,-6.99709 0,-2.94176 -3.1144,-12.17491 -6.9243,-20.51709 -14.4096,-31.55746 -28.2362,-60.70656 -31.2289,-65.850124 -1.7055,-2.9343 -10.3261,-19.739795 -19.1572,-37.345567 -12.331,-24.582418 -17.4014,-32.19996 -21.8458,-32.83363 -0.5244,-0.07425 -1.009,-0.127069 -1.4486,-0.140293 z m -12.1031,4.308688 c -0.2385,-0.01026 -0.482,0.01026 -0.7044,0.06355 -17.5845,4.192564 -42.0925,9.120868 -45.3013,9.112355 -2.2007,-0.0051 -8.8031,1.295235 -14.6715,2.891583 -5.8686,1.596296 -13.0711,3.140718 -16.0052,3.428168 -2.9343,0.287583 -11.9373,1.969213 -20.0066,3.740824 -8.0692,1.771641 -19.473,3.777531 -25.3417,4.459817 -12.2999,1.429989 -38.9343,8.839414 -42.27422,11.759018 -1.24458,1.089466 -1.43257,4.614696 -0.41041,7.830689 1.44063,4.53593 3.14523,5.435901 7.60153,4.006553 3.1609,-1.013718 17.1452,-4.040084 31.0833,-6.720963 13.9377,-2.680879 34.3445,-6.894132 45.3479,-9.367638 21.0843,-4.739706 23.8424,-5.138399 56.576,-8.11726 16.8413,-1.532505 21.6527,-3.032095 26.5867,-8.283941 4.8172,-5.12782 5.4238,-7.319249 3.0271,-10.95674 -1.4434,-2.188967 -3.7652,-3.767395 -5.5072,-3.844989 z" />
      </g>
    </svg>
  );
};

export default LogoIcon;
