import matplotlib.pyplot as plt
import json

# Define the data files
files = ["data_2000xml.json", "data_2000json.json"]

# Create a figure and axis for the plot
fig, ax = plt.subplots()

fileColors = ["#6fff79", "#fA00ff"]
fileLabels = ["XML", "JSON"]

# Loop through each file and plot data for all two datafiles on the same plot
for i, file in enumerate(files):
    dictionary = json.load(open(file, 'r'))
    xAxis = [key for key, value in dictionary.items()]
    # Convert milliseconds to seconds for y-axis values
    yAxis = [value / 1000 for key, value in dictionary.items()]
    ax.plot(xAxis, yAxis, color=fileColors[i], label=fileLabels[i])

ax.set_xlabel('Runs')
ax.set_ylabel('Load time (seconds)')  # Update the label to indicate milliseconds
ax.set_title('Measurements when using 2000 articles')
n = 100
plt.xticks(range(0, 1001, n), range(0, 1001, n), rotation=90)
ax.grid(True)
ax.legend()

# Save the plot to an image file (if needed)
# plt.savefig('image1')

plt.show()