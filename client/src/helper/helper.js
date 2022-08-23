import _ from 'lodash';

export function getSum(transaction, type){
    let sum = _(transaction)
                        .groupBy("type")
                        .map((obj, key) => {
                            if(!type) return _.sumBy(obj,'amount')

                            return {
                                'type' : key,
                                'color' : obj[0].color,
                                'total' : _.sumBy(obj, 'amount')
                            }
                        })
                        .value

    return sum;
}

export function getLabels(transaction){
    let amountSum = getSum(transaction, 'type')
    let Total =_.sum(getSum(transaction))
    
    let percent = _(amountSum).map(objs => _.assign(objs, { percent : (100*objs.total) / Total } )).value()
    return percent
}