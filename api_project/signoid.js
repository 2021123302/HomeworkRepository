var courseScedule = {
    CSI2109: {},
    CSI2101: {},
    CSI2103: {},
    CSI3101: {},
    CSI3102: {},
    CAC1100: {},
    CSI2102: {},
    CSI2106: {},
    CSI2109: {},
    CSI4101: {},
    CSI4105: {},
    CSI4109: {},
    CSI4108: {},
    CSI4116: {},
    CSI4117: {},
    CSI4119: {},
    CSI4120: {},
    CSI4121: {}
}; // 시간표 객체
var probability=1;
var signoidReady1=0; //내 정보에서 받아서 계산가능한 값만 더할 변수
var totalNumber ; // 정원
var numofParticipants; // 참여인원
var totalNumber_1; //정원_1학년
var majorElective = new Boolean(false); // 종별전선
var majorRequired = new Boolean(false); // 종별전필
var studentGrade; //학생들 평점
var Mileage; // 넣은 마일리지
var numOfSubjects; // 신청과목수
var applyForGrad = new Boolean(false); //졸업신청여부
var firstClass = new Boolean(false); //초수강여부
var totalCredits; //총이수학점
var gradCredits; //졸업이수학점
var lastCredits; //직전학기이수학점
var averageCredits; // 학기당 평균 수강학점
var semester; //학기수
var online = new Boolean(false); //실시간온라인
var video = new Boolean(false);  //동영상콘텐츠
var numOfMajor;  //전공자 정원
var grad_is_NAY; //평점is NAY
var MajorIsIncluded = new Boolean(false); //전공자정원포함여부




//지환님 코드
var userCode = 0;
let UCA = [];

function makeCode() {
    userCode = UCA.join('');
}
function kakaoActive() {
    makeCode()
    sendLinkDefault()
}
function sendLinkDefault() {
    Kakao.init('9c2d3d10a2d0c8cd14dd385207763674')
    Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
            title: '인프 시간표',
            description: '코드: ' + userCode,
            imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/95/YonseiUniversityEmblem.svg/1200px-YonseiUniversityEmblem.svg.png',
            link: {
                mobileWebUrl: 'https://developers.kakao.com',
                webUrl: 'https://developers.kakao.com'
            }
        },
        buttons: [
            {
                title: '웹으로 보기',
                link: {
                    mobileWebUrl: 'https://developers.kakao.com',
                    webUrl: 'https://developers.kakao.com'
                }
            },
        ]
    })
}
// 여기까지 지환님 코드


function signoidReady(){
    signoidReady1=11.63  //intercept를 기본으로 더합니다.

    var one_one = 0;  //각 학기 수강학점
    var one_two = 0;
    var two_one = 0;
    var two_two = 0;
    var thr_one = 0;
    var thr_two = 0;
    var four_one =0;
    var four_two =0;
    var five_one =0;
    var five_two =0;
    var six_one = 0;
    var six_two = 0;

    var myMajor = document.getElementsByName("myMajor");  // 단과대가 공과대학이면 MajorIsIncluded 를 true로 바꾸고 공과대학이아니면 그대로 false값을 가집니다.
    myMajor = myMajor[0].options[myMajor[0].selectedIndex].value;
    if(myMajor=="공과대학"){
    MajorIsIncluded = true;
    }else{
    MajorIsIncluded = false;
    }

    gradCredits = document.getElementsByName("myFullCreditsForGrad");  //gradCredits 에 졸업이수학점을 저장합니다.
    gradCredits = gradCredits[0].value;
    gradCredits *=1; //spring to int

    semester = document.getElementsByName("mySemesters");  //semester 에 학기수를 저장합니다.
    semester = semester[0].value;     
    semester *=1;       //spring to int                  
    if(semester>=8){                    // 3, 4, 5학년에 따라 signoidReady1값에 알맞은 상수를 더해줍니다.
        signoidReady1=signoidReady1 +12.65;
    }else if(semester>=6){
        signoidReady1=signoidReady1 -1.19;
    }else if(semester>=4){
        signoidReady1=signoidReady1 -0.36;
    }else{
        signoidReady1=signoidReady1;
    }


    applyForGrad = document.getElementsByName("myAppliedForGrad")[0].checked;  //졸업신청 여부값을 저장하고 true이면 그에맞는 상수를 더해줍니다.
    if(applyForGrad){
        signoidReady1 = signoidReady1 - 0.22;
    }

                                                                    // 최대 12학기 다닐수 있으므로 12가 최대값이라고 가정.
    one_one = document.getElementsByName("myCreditsAcquired1_1");  // 학기당 이수학점을 저장하고 총 이수학점에 더합니다.
    one_one = one_one[0].value;
    one_one *=1;   //spring to int
    lastCredits = one_one;                                          // 직전학기 이수학점 저장
    if(semester>1){
    one_two = document.getElementsByName("myCreditsAcquired1_2");
    one_two = one_two[0].value;
    one_two *=1;
    lastCredits = one_two;
    if(semester>2){
    two_one = document.getElementsByName("myCreditsAcquired2_1");
    two_one = two_one[0].value;
    two_one *=1;
    lastCredits = two_one;
    if(semester>3){
    two_two = document.getElementsByName("myCreditsAcquired2_2");
    two_two = two_two[0].value;
    two_two *=1;
    lastCredits = two_two;
    if(semester>4){
    thr_one = document.getElementsByName("myCreditsAcquired3_1");
    thr_one = thr_one[0].value;
    thr_one *=1;
    lastCredits = thr_one;
    if(semester>5){
    thr_two = document.getElementsByName("myCreditsAcquired3_2");
    thr_two = thr_two[0].value;
    thr_two *=1;
    lastCredits = thr_two;
    if(semester>6){
    four_one = document.getElementsByName("myCreditsAcquired4_1");
    four_one = four_one[0].value;
    four_one *=1;
    lastCredits = four_one;
    if(semester>7){
    four_two = document.getElementsByName("myCreditsAcquired4_2");
    four_two = four_two[0].value;
    four_two *=1;
    lastCredits = four_two;
    if(semester>8){
    five_one = document.getElementsByName("myCreditsAcquired5_1");
    five_one = five_one[0].value;
    five_one *=1;
    lastCredits = five_one;
    if(semester>9){
    five_two = document.getElementsByName("myCreditsAcquired5_2");
    five_two = five_two[0].value;
    five_two *=1;
    lastCredits = five_two;
    if(semester>10){
    six_one = document.getElementsByName("myCreditsAcquired6_1");
    six_one = six_one[0].value;
    six_one *=1;
    lastCredits = six_one;
    if(semester>11){
    six_two = document.getElementsByName("myCreditsAcquired6_2");
    six_two = six_two[0].value;
    six_two *=1;
    lastCredits = six_two;
    }}}}}}}}}}}

    totalCredits = one_one+one_two+two_one+two_two+thr_one+thr_two+four_one+four_two+five_one+five_two+six_one+six_two; //총이수학점 계산
    averageCredits = totalCredits/semester;             //학기당수강학점 = 총이수학점/학기수
   
    if(averageCredits>=18){                                     //학기당 평균이상학점이 18학점이상이면 성실하다고 가정할 수 있어 모든 과목을 초수강이라 가정합니다.
        firstClass = true;
        signoidReady1 = signoidReady1 +1.40;       //초수강이면 알맞은 계수를 더해줍니다.
    }

    signoidReady1 = signoidReady1 + (totalCredits/gradCredits)*3.56;      //총이수학점_졸업이수학점 * 알맞은 상수를 더해줍니다.
    signoidReady1 = signoidReady1 + (lastCredits/averageCredits)*0.25;   //직전학기이수학점_학기당이수학점 * 알맞은상수를 더해줍니다

    console.log(signoidReady1);
    
}

//고른 과목에 따라 시간표에 해당과목 추가, 변수계산
function addCoursetoTable(){

    var selectCourseName1 = document.getElementsByName("csClass");  
    selectCourseName1 = selectCourseName1[0].options[selectCourseName1[0].selectedIndex].value;
    
    Mileage = document.getElementsByName("csMileage"); 
    Mileage = Mileage[0].value;
    Mileage *=1; //spring to int

    // signoid학정번호 = 정원*계수 + 참여인원*계수 ..... 로 이루어져있습니다.csv파일 참고  즉, 과목이름에 영향받는 signoid 부분
    // signoidReady1 = 사전의 입력받은 변수들로 계산 가능한 signoid 부분
    // 따라서 두 변수를 더한 다음에 계산하면 된다.
    switch(selectCourseName1){
        case "이경호/인터넷프로그래밍": 
                                      document.getElementById("Mon2").innerText ="이경호/인터넷프로그래밍";
                                      document.getElementById("Mon2").style.backgroundColor = 'rgb(102, 102, 153)';
                                      document.getElementById("Wed2").innerText ="이경호/인터넷프로그래밍";  
                                      document.getElementById("Wed2").style.backgroundColor = 'rgb(102, 102, 153)';
                                      document.getElementById("Wed3").innerText ="이경호/인터넷프로그래밍";
                                      document.getElementById("Wed3").style.backgroundColor = 'rgb(102, 102, 153)';
                                      UCA.push("07");
                                      courseScedule.CSI2109.day=['Mon2', 'Wed2','Wed3'];
                                      courseScedule.CSI2109.professorName="이경호";
                                      courseScedule.CSI2109.courseName="인터넷프로그래밍";
                                      var signoid2109 = 90*0.14 + 69*(-0.05) + 0*(-0.33)+1*(-1.57) +0*(-2.33)+ 2.58*0.28 + Mileage*0.11 + 6 * (-0.15) + 1*(-13.8) + 0*(-1.2)+75*(-0.12)+0*(-1.42)+75*0*(0.05)+6*0*0.43;
                                      probability *=signoid(signoidReady1,signoid2109);
        break;
        case "이수경/이산구조":      document.getElementById("Tue3").innerText ="이수경/이산구조";
                                    document.getElementById("Tue3").style.backgroundColor = 'rgb(102, 102, 102)';   
                                    document.getElementById("Wed11").innerText ="이수경/이산구조";
                                    document.getElementById("Wed11").style.backgroundColor = 'rgb(102, 102, 102)';   
                                    document.getElementById("Wed12").innerText ="이수경/이산구조";
                                    document.getElementById("Wed12").style.backgroundColor = 'rgb(102, 102, 102)'; 
                                    UCA.push("04");
                                    courseScedule.CSI2101.day=['Tue3', 'Wed11','Wed12'];
                                    courseScedule.CSI2101.professorName="이수경";
                                    courseScedule.CSI2101.courseName="이산구조";
                                    var signoid2101 = 80*0.14 + 145*(-0.05) + 0*(-0.33)+0*(-1.57) +0*(-2.33)+ 0*0.28 + Mileage*0.11 + 6 * (-0.15) + 1*(-13.8) + 1*(-1.2)+56*(-0.12)+1*(-1.42)+56*0*(0.05)+6*1*0.43;
                                    probability *=signoid(signoidReady1,signoid2101);
        break;
        case "황성재/자료구조": document.getElementById("Tue6").innerText ="황성재/자료구조";
                               document.getElementById("Tue6").style.backgroundColor = 'rgb(102, 102, 000)'; 
                               document.getElementById("Thu6").innerText ="황성재/자료구조";  
                               document.getElementById("Thu6").style.backgroundColor = 'rgb(102, 102, 000)'; 
                               document.getElementById("Thu7").innerText ="황성재/자료구조";
                               document.getElementById("Thu7").style.backgroundColor = 'rgb(102, 102, 000)'; 
                               UCA.push("05");
                               courseScedule.CSI2103.day=['Tue6','Thu6', 'Thu7'];
                               courseScedule.CSI2103.professorName="황성재";
                               courseScedule.CSI2103.courseName="자료구조";
                               var signoid2103 = 100*0.14 + 177*(-0.05) + 0*(-0.33)+0*(-1.57) +1*(-2.33)+ 0*0.28 + Mileage*0.11 + 6 * (-0.15) + 1*(-13.8) + 0*(-1.2)+70*(-0.12)+1*(-1.42)+70*0*(0.05)+6*0*0.43;
                                probability *=signoid(signoidReady1,signoid2103);
        break;
        case "차호정/운영체제":  document.getElementById("Mon8").innerText ="차호정/운영체제";       //여기부터 변수값 바꿔야함.
                                document.getElementById("Mon8").style.backgroundColor = 'rgb(102, 102, 051)'; 
                                document.getElementById("Wed3").innerText ="차호정/운영체제";
                                document.getElementById("Wed3").style.backgroundColor = 'rgb(102, 102, 051)';   
                                document.getElementById("Wed4").innerText ="차호정/운영체제";
                                document.getElementById("Wed4").style.backgroundColor = 'rgb(102, 102, 051)'; 
                                UCA.push("08");
                                courseScedule.CSI3101.day=['Mon8','Wed3', 'Wed4'];
                                courseScedule.CSI3101.professorName="차호정";
                                courseScedule.CSI3101.courseName="운영체제";
                                var signoid3101 = 100*0.14 + 177*(-0.05) + 0*(-0.33)+0*(-1.57) +1*(-2.33)+ 0*0.28 + Mileage*0.11 + 6 * (-0.15) + 1*(-13.8) + 0*(-1.2)+70*(-0.12)+1*(-1.42)+70*0*(0.05)+6*0*0.43;
                                probability *=signoid(signoidReady1,signoid3101);
        break;
        case "김영석/컴퓨터아키텍쳐": document.getElementById("Tue8").innerText ="김영석/컴퓨터아키텍쳐";
                                    document.getElementById("Tue8").style.backgroundColor = 'rgb(102, 102, 204)'; 
                                    document.getElementById("Thu6").innerText ="김영석/컴퓨터아키텍쳐"; 
                                    document.getElementById("Thu6").style.backgroundColor = 'rgb(102, 102, 204)';  
                                    document.getElementById("Thu7").innerText ="김영석/컴퓨터아키텍쳐";
                                    document.getElementById("Thu7").style.backgroundColor = 'rgb(102, 102, 204)';
                                    UCA.push("10"); 
                                    courseScedule.CSI3102.day=['Tue8','Thu6', 'Thu7'];
                                    courseScedule.CSI3102.professorName="김영석";
                                    courseScedule.CSI3102.courseName="컴퓨터아키텍쳐";
                                    var signoid3102 = 100*0.14 + 177*(-0.05) + 0*(-0.33)+0*(-1.57) +1*(-2.33)+ 0*0.28 + Mileage*0.11 + 6 * (-0.15) + 1*(-13.8) + 0*(-1.2)+70*(-0.12)+1*(-1.42)+70*0*(0.05)+6*0*0.43;
                                    probability *=signoid(signoidReady1,signoid3102);
        break;
        case "이인권/객체지향프로그래밍": document.getElementById("Tue8").innerText ="이인권/객체지향프로그래밍";
                                        document.getElementById("Tue8").style.backgroundColor = 'rgb(102, 102, 255)';
                                        document.getElementById("Tue9").innerText ="이인권/객체지향프로그래밍";
                                        document.getElementById("Tue9").style.backgroundColor = 'rgb(102, 102, 255)';  
                                        document.getElementById("Thu11").innerText ="이인권/객체지향프로그래밍";
                                        document.getElementById("Thu11").style.backgroundColor = 'rgb(102, 102, 255)';
                                        UCA.push("01");
                                        courseScedule.CSI2102.day=['Tue8','Tue9', 'Thu11'];
                                        courseScedule.CSI2102.professorName="이인권";
                                        courseScedule.CSI2102.courseName="객체지향프로그래밍";
                                        var signoid2102 = 100*0.14 + 177*(-0.05) + 0*(-0.33)+0*(-1.57) +1*(-2.33)+ 0*0.28 + Mileage*0.11 + 6 * (-0.15) + 1*(-13.8) + 0*(-1.2)+70*(-0.12)+1*(-1.42)+70*0*(0.05)+6*0*0.43;
                                        probability *=signoid(signoidReady1,signoid2102);
        break;
        case "벅스텔러번트/컴퓨터프로그래밍": document.getElementById("Thu5").innerText ="벅스텔러번트/컴퓨터프로그래밍";
                                            document.getElementById("Thu5").style.backgroundColor = 'rgb(102, 153, 102)';
                                            document.getElementById("Thu6").innerText ="벅스텔러번트/컴퓨터프로그래밍"; 
                                            document.getElementById("Thu6").style.backgroundColor = 'rgb(102, 153, 102)'; 
                                            document.getElementById("Thu9").innerText ="벅스텔러번트/컴퓨터프로그래밍";
                                            document.getElementById("Thu9").style.backgroundColor = 'rgb(102, 153, 102)';
                                            document.getElementById("Thu10").innerText ="벅스텔러번트/컴퓨터프로그래밍";
                                            document.getElementById("Thu10").style.backgroundColor = 'rgb(102, 153, 102)';
                                            UCA.push("02");
                                            courseScedule.CAC1100.day=['Thu5','Thu6', 'Thu9','Thu10'];
                                            courseScedule.CAC1100.professorName="벅스텔러번트";
                                            courseScedule.CAC1100.courseName="컴퓨터프로그래밍";
                                            var signoid1100 = 100*0.14 + 177*(-0.05) + 0*(-0.33)+0*(-1.57) +1*(-2.33)+ 0*0.28 + Mileage*0.11 + 6 * (-0.15) + 1*(-13.8) + 0*(-1.2)+70*(-0.12)+1*(-1.42)+70*0*(0.05)+6*0*0.43;
                                            probability *=signoid(signoidReady1,signoid1100);
        break;    
        case "이병주/컴퓨터프로그래밍":       document.getElementById("Thu5").innerText ="이병주/컴퓨터프로그래밍";
                                            document.getElementById("Thu5").style.backgroundColor = 'rgb(102, 204, 102)';
                                            document.getElementById("Thu6").innerText ="이병주/컴퓨터프로그래밍";
                                            document.getElementById("Thu6").style.backgroundColor = 'rgb(102, 204, 102)';   
                                            document.getElementById("Thu9").innerText ="이병주/컴퓨터프로그래밍";
                                            document.getElementById("Thu9").style.backgroundColor = 'rgb(102, 204, 102)';
                                            document.getElementById("Thu10").innerText ="이병주/컴퓨터프로그래밍";
                                            document.getElementById("Thu10").style.backgroundColor = 'rgb(102, 204, 102)';
                                            UCA.push("03");
                                            courseScedule.CAC1100.day=['Thu5','Thu6', 'Thu9','Thu10'];
                                            courseScedule.CAC1100.professorName="이병주";
                                            courseScedule.CAC1100.courseName="컴퓨터프로그래밍"; 
                                            var signoid1100 = 100*0.14 + 177*(-0.05) + 0*(-0.33)+0*(-1.57) +1*(-2.33)+ 0*0.28 + Mileage*0.11 + 6 * (-0.15) + 1*(-13.8) + 0*(-1.2)+70*(-0.12)+1*(-1.42)+70*0*(0.05)+6*0*0.43;
                                            probability *=signoid(signoidReady1*signoid1100);                                   
        break;
        case "최종현/컴퓨터과학입문":     document.getElementById("Wed8").innerText ="최종현/컴퓨터과학입문";
                                        document.getElementById("Wed8").style.backgroundColor = 'rgb(102, 255, 102)';
                                        document.getElementById("Fri6").innerText ="최종현/컴퓨터과학입문";
                                        document.getElementById("Fri6").style.backgroundColor = 'rgb(102, 255, 102)';  
                                        document.getElementById("Fri7").innerText ="최종현/컴퓨터과학입문";
                                        document.getElementById("Fri7").style.backgroundColor = 'rgb(102, 255, 102)';
                                        UCA.push("06");
                                        courseScedule.CSI2106.day=['Wed8','Fri6', 'Fri7'];
                                        courseScedule.CSI2106.professorName="최종현";
                                        courseScedule.CSI2106.courseName="컴퓨터과학입문";
                                        var signoid2106 = 100*0.14 + 177*(-0.05) + 0*(-0.33)+0*(-1.57) +1*(-2.33)+ 0*0.28 + Mileage*0.11 + 6 * (-0.15) + 1*(-13.8) + 0*(-1.2)+70*(-0.12)+1*(-1.42)+70*0*(0.05)+6*0*0.43;
                                        probability *=signoid(signoidReady1,signoid2106);
        break;
        case "이경우/컴퓨터아키텍쳐":     document.getElementById("Tue2").innerText ="이경우/컴퓨터아키텍쳐";
                                        document.getElementById("Tue").style.backgroundColor = 'rgb(102, 000, 102)';
                                        document.getElementById("Tue3").innerText ="이경우/컴퓨터아키텍쳐";
                                        document.getElementById("Tue3").style.backgroundColor = 'rgb(102, 000, 102)';  
                                        document.getElementById("Thu2").innerText ="이경우/컴퓨터아키텍쳐";
                                        document.getElementById("Thu2").style.backgroundColor = 'rgb(102, 000, 102)';
                                        UCA.push("09");
                                        courseScedule.CSI3102.day=['Tue2','Tue3', 'Thu2'];
                                        courseScedule.CSI3102.professorName="이경우";
                                        courseScedule.CSI3102.courseName="컴퓨터아키텍쳐";
                                        var signoid3102 = 100*0.14 + 177*(-0.05) + 0*(-0.33)+0*(-1.57) +1*(-2.33)+ 0*0.28 + Mileage*0.11 + 6 * (-0.15) + 1*(-13.8) + 0*(-1.2)+70*(-0.12)+1*(-1.42)+70*0*(0.05)+6*0*0.43;
                                        probability *=signoid(signoidReady1,signoid3102);
        break;
        case "이인권/컴퓨터그래픽스":     document.getElementById("Tue6").innerText ="이인권/컴퓨터그래픽스";
                                        document.getElementById("Tue6").style.backgroundColor = 'rgb(102, 051, 102)';   
                                        document.getElementById("Tue7").innerText ="이인권/컴퓨터그래픽스"; 
                                        document.getElementById("Tue7").style.backgroundColor = 'rgb(102, 051, 102)'; 
                                        document.getElementById("Thu12").innerText ="이인권/컴퓨터그래픽스";
                                        document.getElementById("Thu12").style.backgroundColor = 'rgb(102, 051, 102)';
                                        UCA.push("11");
                                        courseScedule.CSI4105.day=['Tue6','Tue7', 'Thu12'];
                                        courseScedule.CSI4105.professorName="이인권";
                                        courseScedule.CSI4105.courseName="컴퓨터그래픽스";
                                        var signoid4105 = 100*0.14 + 177*(-0.05) + 0*(-0.33)+0*(-1.57) +1*(-2.33)+ 0*0.28 + Mileage*0.11 + 6 * (-0.15) + 1*(-13.8) + 0*(-1.2)+70*(-0.12)+1*(-1.42)+70*0*(0.05)+6*0*0.43;
                                        probability *=signoid(signoidReady1,signoid4105);
        break;
        case "조성배/인공지능":          document.getElementById("Mon6").innerText ="조성배/인공지능";
                                        document.getElementById("Mon6").style.backgroundColor = 'rgb(102, 051, 153)';
                                        document.getElementById("Mon7").innerText ="조성배/인공지능";  
                                        document.getElementById("Mon7").style.backgroundColor = 'rgb(102, 051, 153)';
                                        document.getElementById("Wed6").innerText ="조성배/인공지능";
                                        document.getElementById("Wed6").style.backgroundColor = 'rgb(102, 051, 153)';
                                        UCA.push("12");
                                        courseScedule.CSI4108.day=['Mon6','Mon7', 'Wed6'];
                                        courseScedule.CSI4108.professorName="조성배";
                                        courseScedule.CSI4108.courseName="인공지능";
                                        var signoid4108 = 100*0.14 + 177*(-0.05) + 0*(-0.33)+0*(-1.57) +1*(-2.33)+ 0*0.28 + Mileage*0.11 + 6 * (-0.15) + 1*(-13.8) + 0*(-1.2)+70*(-0.12)+1*(-1.42)+70*0*(0.05)+6*0*0.43;
                                        probability *=signoid(signoidReady1,signoid4108);
        break;
        case "소프트웨어종합설계":        document.getElementById("Wed9").innerText ="소프트웨어종합설계";
                                        document.getElementById("Wed9").style.backgroundColor = 'rgb(102, 051, 204)';
                                        document.getElementById("Fri7").innerText ="소프트웨어종합설계";  
                                        document.getElementById("Fri7").style.backgroundColor = 'rgb(102, 051, 204)';
                                        document.getElementById("Fri8").innerText ="소프트웨어종합설계";
                                        document.getElementById("Fri8").style.backgroundColor = 'rgb(102, 051, 204)';
                                        UCA.push("13");
                                        courseScedule.CSI4101.day=['Wed9','Fri7', 'Fri8'];
                                        courseScedule.CSI4101.professorName="";
                                        courseScedule.CSI4101.courseName="소프트웨어종합설계";
                                        var signoid4101 = 100*0.14 + 177*(-0.05) + 0*(-0.33)+0*(-1.57) +1*(-2.33)+ 0*0.28 + Mileage*0.11 + 6 * (-0.15) + 1*(-13.8) + 0*(-1.2)+70*(-0.12)+1*(-1.42)+70*0*(0.05)+6*0*0.43;
                                        probability *=signoid(signoidReady1,signoid4101);
        break;
        case "송도경/정보보호":          document.getElementById("Mon6").innerText ="송도경/정보보호";
                                        document.getElementById("Mon6").style.backgroundColor = 'rgb(102, 051, 255)';
                                        document.getElementById("Mon7").innerText ="송도경/정보보호";
                                        document.getElementById("Mon7").style.backgroundColor = 'rgb(102, 051, 255)';  
                                        document.getElementById("Wed6").innerText ="송도경/정보보호";
                                        document.getElementById("Wed6").style.backgroundColor = 'rgb(102, 051, 255)';
                                        UCA.push("14");
                                        courseScedule.CSI4109.day=['Mon6','Mon7', 'Wed6'];
                                        courseScedule.CSI4109.professorName="이인권송도경";
                                        courseScedule.CSI4109.courseName="정보보호";
                                        var signoid4109 = 100*0.14 + 177*(-0.05) + 0*(-0.33)+0*(-1.57) +1*(-2.33)+ 0*0.28 + Mileage*0.11 + 6 * (-0.15) + 1*(-13.8) + 0*(-1.2)+70*(-0.12)+1*(-1.42)+70*0*(0.05)+6*0*0.43;
                                        probability *=signoid(signoidReady1,signoid4109);
        break;
        case "김선주/컴퓨터비전":         document.getElementById("Tue3").innerText ="김선주/컴퓨터비전";
                                        document.getElementById("Tue3").style.backgroundColor = 'rgb(102, 051, 000)';
                                        document.getElementById("Tue4").innerText ="김선주/컴퓨터비전";  
                                        document.getElementById("Tue4").style.backgroundColor = 'rgb(102, 051, 000)';
                                        document.getElementById("Thu3").innerText ="김선주/컴퓨터비전";
                                        document.getElementById("Thu3").style.backgroundColor = 'rgb(102, 051, 000)';
                                        UCA.push("15");
                                        courseScedule.CSI4116.day=['Tue3','Tue4', 'Thu3'];
                                        courseScedule.CSI4116.professorName="김선주";
                                        courseScedule.CSI4116.courseName="컴퓨터비전";
                                        var signoid4106 = 100*0.14 + 177*(-0.05) + 0*(-0.33)+0*(-1.57) +1*(-2.33)+ 0*0.28 + Mileage*0.11 + 6 * (-0.15) + 1*(-13.8) + 0*(-1.2)+70*(-0.12)+1*(-1.42)+70*0*(0.05)+6*0*0.43;
                                        probability *=signoid(signoidReady1,signoid4106);
        break;
        case "조성배/데이타마이닝":       document.getElementById("Mon2").innerText ="조성배/데이타마이닝";
                                        document.getElementById("Mon2").style.backgroundColor = 'rgb(102, 051, 051)';
                                        document.getElementById("Wed2").innerText ="조성배/데이타마이닝";  
                                        document.getElementById("Wed2").style.backgroundColor = 'rgb(102, 051, 051)';
                                        document.getElementById("Wed3").innerText ="조성배/데이타마이닝";
                                        document.getElementById("Wed3").style.backgroundColor = 'rgb(102, 051, 051)';
                                        UCA.push("16");
                                        courseScedule.CSI4117.day=['Mon2','Wed2', 'Wed3'];
                                        courseScedule.CSI4117.professorName="조성배";
                                        courseScedule.CSI4117.courseName="데이터마이닝";
                                        var signoid4117 = 100*0.14 + 177*(-0.05) + 0*(-0.33)+0*(-1.57) +1*(-2.33)+ 0*0.28 + Mileage*0.11 + 6 * (-0.15) + 1*(-13.8) + 0*(-1.2)+70*(-0.12)+1*(-1.42)+70*0*(0.05)+6*0*0.43;
                                        probability *=signoid(signoidReady1,signoid4117);
        break;
        case "이진호/멀티코어및GPU프로그래밍":       document.getElementById("Wed7").innerText ="이진호/멀티코어및GPU프로그래밍";
                                                    document.getElementById("Wed7").style.backgroundColor = 'rgb(153, 000, 000)';
                                                    document.getElementById("Wed8").innerText ="이진호/멀티코어및GPU프로그래밍";  
                                                    document.getElementById("Wed8").style.backgroundColor = 'rgb(153, 000, 000)';
                                                    document.getElementById("Fri6").innerText ="이진호/멀티코어및GPU프로그래밍";
                                                    document.getElementById("Fri6").style.backgroundColor = 'rgb(153, 000, 000)';
                                                    UCA.push("17");
                                                    courseScedule.CSI4119.day=['Wed7','Wed8', 'Fri6'];
                                                    courseScedule.CSI4119.professorName="이진호";
                                                    courseScedule.CSI4119.courseName="멀티코어및GPU프로그래밍";
                                                    var signoid4119 = 100*0.14 + 177*(-0.05) + 0*(-0.33)+0*(-1.57) +1*(-2.33)+ 0*0.28 + Mileage*0.11 + 6 * (-0.15) + 1*(-13.8) + 0*(-1.2)+70*(-0.12)+1*(-1.42)+70*0*(0.05)+6*0*0.43;
                                                    probability *=signoid(signoidReady1,signoid4119);

        break;
        case "박노성/기계학습":          document.getElementById("Tue5").innerText ="박노성/기계학습";
                                        document.getElementById("Tue5").style.backgroundColor = 'rgb(255, 102, 102)';
                                        document.getElementById("Thu4").innerText ="박노성/기계학습";
                                        document.getElementById("Thu4").style.backgroundColor = 'rgb(255, 102, 102)';  
                                        document.getElementById("Thu5").innerText ="박노성/기계학습";
                                        document.getElementById("Thu5").style.backgroundColor = 'rgb(255, 102, 102)';
                                        UCA.push("18");
                                        courseScedule.CSI4120.day=['Tue5','Thu4', 'Thu5'];
                                        courseScedule.CSI4120.professorName="박노성";
                                        courseScedule.CSI4120.courseName="기계학습";
                                        var signoid4120 = 100*0.14 + 177*(-0.05) + 0*(-0.33)+0*(-1.57) +1*(-2.33)+ 0*0.28 + Mileage*0.11 + 6 * (-0.15) + 1*(-13.8) + 0*(-1.2)+70*(-0.12)+1*(-1.42)+70*0*(0.05)+6*0*0.43;
                                        probability *=signoid(signoidReady1,signoid4120);
        break;
        case "여진영/빅데이터":       document.getElementById("Tue6").innerText ="여진영/빅데이터";
                                        document.getElementById("Tue6").style.backgroundColor = 'rgb(051, 102, 153)';
                                        document.getElementById("Tue7").innerText ="여진영/빅데이터";
                                        document.getElementById("Tue7").style.backgroundColor = 'rgb(051, 102, 153)';
                                        document.getElementById("Thu6").innerText ="여진영/빅데이터";
                                        document.getElementById("Thu6").style.backgroundColor = 'rgb(051, 102, 153)';
                                        UCA.push("19");
                                        courseScedule.CSI4121.day=['Tue6','Tue7', 'Thu6'];
                                        courseScedule.CSI4121.professorName="여진영";
                                        courseScedule.CSI4121.courseName="빅데이터";
                                        var signoid4121 = 100*0.14 + 177*(-0.05) + 0*(-0.33)+0*(-1.57) +1*(-2.33)+ 0*0.28 + Mileage*0.11 + 6 * (-0.15) + 1*(-13.8) + 0*(-1.2)+70*(-0.12)+1*(-1.42)+70*0*(0.05)+6*0*0.43;
                                        probability *=signoid(signoidReady1,signoid4121);
        break;
        default : 
        break;
    }
    console.log(probability);
    var percent = 100*probability; 
    document.getElementById("#calc-result-number").innerText =  percent.toFixed(2);  // 총확률표시 부분에 확률 표시.
};

function signoid(signoidrReady1,signoidReady2){       //시그노이드 값을 리턴해주는 함수
    var signoidt=(1/(1+Math.exp((-1)*(signoidReady1+signoidReady2))));
    console.log(signoidReady1);
    console.log(signoidReady2);
    console.log(signoidt);
    return signoidt;
}


