const generateSlots =({
    startTime,
    endTime,
    slotDuration,
    bufferTime = 0
}) => {

const slots = []

let currentTime = startTime

while (currentTime + slotDuration <= endTime) {

    const slotStart = currentTime

    const slotEnd = currentTime + slotDuration

    slots.push({
        startTime:slotStart,
        endTime:slotEnd
    })

    currentTime = slotEnd + bufferTime

    }
    return slots
    
}

export default generateSlots