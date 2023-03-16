import pandas as pd

df = pd.read_csv("./result_words.csv")
df.to_json("./vocabulary.json", orient="records")