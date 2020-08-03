function average(array){
    const len =array.length;
   // array= [];
    let sum =0;
    for(let i=0; i<len;i++){
        sum = sum+ array[i];
    }
    let result = sum/len;
    console.log(result);
}

const scores =[90,94,96,92,92,90,98];
average(scores);