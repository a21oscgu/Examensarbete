import matplotlib.pyplot as plt
import json

# Define the data files
files = ["data_7xml.json", "data_2000xml.json", "data_7json.json", "data_2000json.json"]

# Create a figure and axis for the plot
fig, ax = plt.subplots()

fileColors = ["#3e8a43", "#3e8a43", "#968041", "#968041"]
fileLabels = ["7 articles (XML)", "2000 articles (XML)", "7 articles (JSON)", "2000 articles (JSON)"]

# Loop through each file and plot data for all two datafiles on the same plot
for i, file in enumerate(files):
    dictionary = json.load(open(file, 'r'))
    xAxis = [key for key, value in dictionary.items()]
    yAxis = [value for key, value in dictionary.items()]
    ax.plot(xAxis, yAxis, color=fileColors[i], label=fileLabels[i])

ax.set_xlabel('Run')
ax.set_ylabel('Load time')
ax.set_title('Search data')
n = 25
plt.xticks(range(0, len(xAxis), n), xAxis[::n], rotation=90)
ax.grid(True)
ax.legend()

# Save the plot to an image file (if needed)
# plt.savefig('image1')

plt.show()