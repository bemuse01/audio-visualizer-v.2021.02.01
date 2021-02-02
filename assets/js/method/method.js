const METHOD = {
    normalize(x, a, b, max, min){
        return (b - a) * (x - min) / (max - min) + a 
    }
}