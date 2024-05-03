import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

def exampleBarChars():
    # Read your data from file
    file = "combined_data_for_pilotstudie_histogram.json"
    df = pd.read_json(file, orient='records')

    # Define your grouping categories
    groups = ["100JSON(70)", "100XML(70)"]

    # Width of the bars
    barWidth = 0.3

    # Initialize lists to store bar data and error intervals for each group
    barsData = []
    barsInterval = []

    # Iterate over groups and calculate mean and standard deviation for each group
    for group in groups:
        group_data = df[group]
        barsData.append(group_data.mean() / 1000)  # Convert from ms to seconds
        barsInterval.append(group_data.std() / 1000)  # Convert from ms to seconds

    # The x-position order of bars
    barsOrder = np.arange(len(groups))

    # Colours of bar charts
    colors = ["#968041", "#3e8a43"]

    # Opacity of colours
    Opacity = 1

    # Interval cap size
    intervalCapsize = 7

    # Plot bars for each group
    for i in range(len(groups)):
        plt.bar(barsOrder[i], barsData[i], color=colors[i], edgecolor='black',
                width=barWidth, yerr=barsInterval[i], capsize=intervalCapsize,
                alpha=Opacity, label=groups[i])

    # Put a tick on the x-axis under each pair of bars and label it with data size
    plt.xticks(barsOrder, groups)
    plt.ylabel('Average load time (seconds)')  # Change ylabel to seconds
    plt.xlabel('Number of articles')
    plt.title('Measurements when using 100 articles')
    plt.legend()

    # Set the y-axis limit
    plt.ylim(0, 1)  # Adjusted for seconds

    plt.show()

exampleBarChars()