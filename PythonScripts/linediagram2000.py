import matplotlib.pyplot as plt
import json
from matplotlib.ticker import FuncFormatter

# Define a function to convert milliseconds to seconds
def milliseconds_to_seconds(ms, pos):
    return '{:.0f}'.format(ms / 1000)  # Convert milliseconds to seconds and round to nearest integer

# Define the data files
files = ["data_2000xml.json", "data_2000json.json"]

# Create a figure and axis for the plot
fig, ax = plt.subplots()

fileColors = ["#6fff79", "#fA00ff"]
fileLabels = ["XML", "JSON"]

# Initialize variables to store minimum and maximum y-values
min_y = float('inf')
max_y = float('-inf')

# Loop through each file and plot data for all two datafiles on the same plot
for i, file in enumerate(files):
    dictionary = json.load(open(file, 'r'))
    xAxis = [key for key, value in dictionary.items()]
    yAxis = [value for key, value in dictionary.items()]

    # Update min_y and max_y
    min_y = min(min_y, min(yAxis))
    max_y = max(max_y, max(yAxis))

    ax.plot(xAxis, yAxis, color=fileColors[i], label=fileLabels[i])

ax.set_xlabel('Run')
ax.set_ylabel('Load time (seconds)')  # Update y-axis label
ax.set_title('Measurements when using 2000 articles')

# Set the y-axis limits to show a buffer above and below the actual data
buffer = 0.1  # adjust as needed
ax.set_ylim(min_y - buffer * (max_y - min_y), max_y + buffer * (max_y - min_y))

# Format y-axis ticks to display values in milliseconds
formatter = FuncFormatter(milliseconds_to_seconds)
ax.yaxis.set_major_formatter(formatter)

n = 100
plt.xticks(range(0, 1001, n), range(0, 1001, n), rotation=90)
ax.grid(True)
ax.legend()

# Save the plot to an image file (if needed)
# plt.savefig('image1')

plt.show()