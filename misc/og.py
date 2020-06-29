interval = input("enter interval: ")
posarry = np.array()
timearry = np.array()
for n in interval: 
    time = input("enter time in sec: ")
    position = 20*time - (5*time*time*time)
    timearry.append(time)
    posarry.append(position)

plt.plot(time, position)
plt.xlabel('Time (sec)')
plt.ylabel('Position (m)')